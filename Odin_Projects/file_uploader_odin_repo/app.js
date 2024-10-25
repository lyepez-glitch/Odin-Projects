const { PrismaClient } = require('@prisma/client')
const cloudinary = require('./cloudinaryConfig');
const prisma = new PrismaClient()
const fs = require('fs');
const express = require('express')

require('dotenv').config();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');
const app = express()
const port = process.env.EPORT || 4000;
const path = require('path');
const bodyParser = require('body-parser')
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const { PrismaSessionStore } = require('@quixo3/prisma-session-store');


app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000 // ms
        },
        secret: 'a santa at nasa',
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(
            new PrismaClient(), {
                checkPeriod: 2 * 60 * 1000,
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            }
        )
    })
);
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
passport.use(
    new LocalStrategy(async(username, password, done) => {
        try {
            console.log(47, username, password)

            // const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
            const user = await prisma.user.findUnique({
                where: { email: username }
            });
            // const user = rows[0];
            console.log(50, user)
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            const match = await bcrypt.compare(password, user.password);
            console.log('match', match, password, user.password)
            if (!match) {
                // passwords do not match!
                return done(null, false, { message: "Incorrect password" })
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {

        const user = await prisma.user.findUnique({
            where: { id: id }
        });
        // const user = rows[0];

        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.get("/signUp", (req, res) => {
    res.render("signUp", {});
});
app.post("/signUp", (req, res) => {
    let { fname, lname, email, password } = req.body;
    bcrypt.hash(password, 10, async(err, hashedPassword) => {
        // if err, do something
        // otherwise, store hashedPassword in DB
        // let qry = `INSERT INTO users(firstName,lastName,username,password,admin,memberStatus)
        // VALUES ($1,$2,$3,$4,$5,$6) RETURNING id;`

        // if (admin === 'on') {
        //     admin = true;
        // } else {
        //     admin = false;
        // }
        // const insertedUser = await pool.query(qry, [fname, lname, email, hashedPassword, admin, false]);

        const insertedUser = await prisma.user.create({
            data: {
                firstName: fname,
                lastName: lname,
                email: email,
                password: hashedPassword
            }
        });


        console.log('insertedUser', insertedUser)
        res.redirect('/log-in');

    });
});

app.get("/log-in", (req, res) => {
    res.render("login", {});
})

app.post(
    "/log-in",
    passport.authenticate("local", {
        successRedirect: "/upload-file",
        failureRedirect: "/log-in"
    })
);

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/upload-file');
}
app.get("/", isAuthenticated, async(req, res) => {
    //show all folders
    const folders = await prisma.folder.findMany();

    res.render("index", { user: res.locals.currentUser, folders })
})

app.get("/upload-file/:id", isAuthenticated, (req, res) => {
    const { id } = req.params;
    res.render("uploadForm", { id });
})
app.post("/upload-file/:id", upload.array('photos', 12), async(req, res) => {
    const { id } = req.params;

    console.log('Files:', req.files, id);
    const folder = await prisma.folder.findUnique({
        where: {
            id: parseInt(id),
        },
        select: {
            id: true,
            name: true,
            files: true
        }
    })

    let files = req.files;
    console.log(176, files);
    let newFiles = [];
    console.log('Cloudinary Config:', {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path);
            const newFile = await prisma.file.create({
                data: {
                    filename: file.originalname,
                    folderId: folder.id,
                    path: file.path,
                    size: file.size,
                    url: result.secure_url
                }
            })
            console.log('newfile', newFile)
            newFiles.push({ id: newFile.id });
        }
        const updateFile = await prisma.folder.update({
            where: {
                id: parseInt(id)
            },
            data: {
                files: { connect: newFiles }

            },
        })
        res.redirect('/');

    } catch (e) {
        console.log('181 e', e);
    }




})

app.get("/createFolder", (req, res) => {
    const { id } = req.query;
    res.render("folderForm", { id })

})
app.post("/createFolder", async(req, res) => {
    const { folder } = req.body;
    const { id } = req.query;
    const newFolder = await prisma.folder.create({
        data: {
            name: folder,
            userId: parseInt(id)
        }
    });
    console.log('newFolder', newFolder);
    res.redirect('/');
})
app.get("/updateFolder/:id", async(req, res) => {

    console.log('req params', req.params)
    const id = parseInt(req.params.id);


    const folder = await prisma.folder.findUnique({
        where: {
            id: parseInt(id),
        },
        select: {
            id: true,
            name: true,
            files: true
        },
    })
    console.log('edit folder', folder)
    res.render("updateFolder", { folder })
})

app.post("/updateFolder/:id", async(req, res) => {
    const { folder } = req.body;
    const { id } = req.params;
    const updateFolder = await prisma.folder.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: folder

        },
    })
    console.log("updated folder", updateFolder)
    res.redirect('/');

})

app.get("/deleteFolder/:id", async(req, res) => {
    const { id } = req.params;
    const deleteUser = await prisma.folder.delete({
        where: {
            id: parseInt(id)
        },
    })
    console.log('deleted', deleteUser);
    res.redirect('/');

})

app.get("/details", async(req, res) => {
    const { id, filename, size, createdAt, path, url } = req.query;
    const file = {
        id,
        filename,
        size,
        createdAt,
        path,
        url
    }
    console.log('file', file)
    res.render('details', {
        file
    });
})

app.get("/download", async(req, res) => {
    const { url } = req.query;
    res.redirect(url);
    // const filePath = path.join(__dirname, '/uploads/',
    //     pathname);
    // console.log('filepath', filePath)

    // fs.access(filePath, fs.constants.F_OK, (err) => {
    //     if (err) {
    //         return res.status(404).send("Can't find file");
    //     }
    //     res.download(filePath, (err) => {
    //         if (err) {
    //             console.error('Err downloading', err)
    //             res.status(500).send('Error downloading')
    //         }
    //     })
    // })

})

app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`)
})