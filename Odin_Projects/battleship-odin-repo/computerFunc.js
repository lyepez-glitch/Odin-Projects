const randomRender = (player, input) => {
    var randomIndex = Math.floor(Math.random() * 10);
    var randomCol = Math.floor(Math.random() * 10);
    player.board.board.forEach((row, rowIndex) => {
        if (randomIndex === rowIndex) {
            row.forEach((col, colIndex) => {
                if (randomCol === colIndex) {
                    player.board.board[row][colIndex] === input
                }
            })
            player.board.board[row] = input
        }

    })
}

export { randomRender };