var ChessImageGenerator = require('chess-image-generator')
import { createCanvas } from 'canvas'


export default async function handler(req, res) {

  var imageGenerator = new ChessImageGenerator({
    size: parseInt(req.query.size) ?? 480,
    style: req.query.style ?? 'cburnett',
    light: req.query.light ?? 'rgb(236,218,185)',
    dark:  req.query.dark  ?? 'rgb(174,138,104)',
    flipped: req.query.flipped === '' || req.query.flipped === 'true' ? true : false
  })
  imageGenerator.highlight = req.query.highlight ?? 'rgba(155,199,0,0.41)'

  var fen = req.query.fen
  if(!fen) {
    fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  } else if(fen.split(' ').length == 1) {
    fen = fen + ' w KQkq - 0 1'
  }
  await imageGenerator.loadFEN(fen)
  
  const sq = req.query.squares
  if(sq)
    imageGenerator.highlightSquares(sq.split(','))

  const buffer = await imageGenerator.generateBuffer()

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": buffer.length,
  })
  res.end(buffer, "binary")
}
