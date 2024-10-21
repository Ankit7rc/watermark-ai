const imageInput = document.getElementById('imageInput');
const textInput = document.getElementById('textInput');
const processButton = document.getElementById('processButton');
const resultContainer = document.getElementById('resultContainer');
const downloadLink = document.getElementById('downloadLink');

processButton.addEventListener('click', processImage);

function processImage() {
    const file = imageInput.files[0];
    const text = textInput.value || 'Sample Text';

    if (!file) {
        alert('Please select an image first.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas size to match image size
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw image
            ctx.drawImage(img, 0, 0, img.width, img.height);

            // Set text properties
            const fontSize = Math.min(img.width, img.height) / 20; // Adjust text size based on image dimensions
            ctx.font = `${fontSize}px Arial`;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; // 20% opacity white
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Calculate text positions (25 instances with increased spacing)
            const positions = [
                {x: 0.1, y: 0.1}, {x: 0.3, y: 0.1}, {x: 0.5, y: 0.1}, {x: 0.7, y: 0.1}, {x: 0.9, y: 0.1},
                {x: 0.2, y: 0.3}, {x: 0.4, y: 0.3}, {x: 0.6, y: 0.3}, {x: 0.8, y: 0.3},
                {x: 0.1, y: 0.5}, {x: 0.3, y: 0.5}, {x: 0.5, y: 0.5}, {x: 0.7, y: 0.5}, {x: 0.9, y: 0.5},
                {x: 0.2, y: 0.7}, {x: 0.4, y: 0.7}, {x: 0.6, y: 0.7}, {x: 0.8, y: 0.7},
                {x: 0.1, y: 0.9}, {x: 0.3, y: 0.9}, {x: 0.5, y: 0.9}, {x: 0.7, y: 0.9}, {x: 0.9, y: 0.9},
                {x: 0.5, y: 0.2}, {x: 0.5, y: 0.8}
            ];

            // Draw text at each position
            positions.forEach(pos => {
                ctx.save();
                ctx.translate(canvas.width * pos.x, canvas.height * pos.y);
                ctx.rotate(Math.PI / 3); // 60 degrees tilt
                ctx.fillText(text, 0, 0);
                ctx.restore();
            });

            // Display result
            resultContainer.innerHTML = '';
            const resultImage = new Image();
            resultImage.src = canvas.toDataURL('image/png');
            resultContainer.appendChild(resultImage);

            // Set up download link
            downloadLink.href = canvas.toDataURL('image/png');
            downloadLink.download = 'overlay_image.png';
            downloadLink.style.display = 'inline-block';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}
