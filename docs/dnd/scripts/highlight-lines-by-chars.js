const colorPalette = [
    '#2e8b57', '#ff0000',
    '#ff8c00', '#00ff7f', '#00bfff', '#0000ff',
    '#ff00ff', '#f0e68c', '#dda0dd', '#7b68ee'
];

const uniqueCharsSet = new Set();
document.querySelectorAll('p.line').forEach(p => {
    const char = p.getAttribute('data-character');
    if (char && char !== '') uniqueCharsSet.add(char);
});
const uniqueChars = [...uniqueCharsSet];


// Применение цвета к тексту реплики
// uniqueChars.forEach((char, index) => {
//     const color = index < colorPalette.length ? colorPalette[index] : '#D3D3D3';
//     document.querySelectorAll(`p.line[data-character="${char}"]`).forEach(p => {
//         p.style.backgroundColor = color;
//     });
// });

// Применение цвета к портрету
uniqueChars.forEach((char, index) => {
    const color = index < colorPalette.length ? colorPalette[index] : '#D3D3D3';
    document.querySelectorAll(`.character-portrait[data-character="${char}"]`).forEach(img => {
        img.style.border = `3px solid ${color}`;
    });
});