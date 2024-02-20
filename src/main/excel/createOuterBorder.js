const createOuterBorder = (
  worksheet,
  start = { row: 1, col: 1 },
  end = { row: 1, col: 1 },
  borderWidth = 'thin'
) => {
  const borderStyle = {
    style: borderWidth
  }
  for (let i = start.row; i <= end.row; i++) {
    const leftBorderCell = worksheet.getCell(i, start.col)
    const rightBorderCell = worksheet.getCell(i, end.col)
    leftBorderCell.border = {
      ...leftBorderCell.border,
      left: borderStyle
    }
    rightBorderCell.border = {
      ...rightBorderCell.border,
      right: borderStyle
    }
  }

  for (let i = start.col; i <= end.col; i++) {
    const topBorderCell = worksheet.getCell(start.row, i)
    const bottomBorderCell = worksheet.getCell(end.row, i)
    topBorderCell.border = {
      ...topBorderCell.border,
      top: borderStyle
    }
    bottomBorderCell.border = {
      ...bottomBorderCell.border,
      bottom: borderStyle
    }
  }
}

module.exports = createOuterBorder
