export let get_piece_positions = (game, piece) => {
    return [].concat(...game.board()).map((p, index) => {
      if (p !== null && p.type === piece.type && p.color === piece.color) {
        return index
      }
    }).filter(Number.isInteger).map((piece_index) => {
      const row = 'abcdefgh'[piece_index % 8]
      const column = Math.ceil((64 - piece_index) / 8)
      return row + column
    })
  }

export let get_legal_moves_by_piece = (game, piece) => {
    return game.moves({ verbose: true })
                .filter((move) => move.piece === piece.type && move.color === piece.color)
                .map((move) => move.san)
  }