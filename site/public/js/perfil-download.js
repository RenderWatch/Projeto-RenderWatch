
function copyCode() {
    // Get the code element
    const codeElement = document.querySelector('.code');
  
    // Create a temporary textarea element and set its value to the code
    const textArea = document.createElement('textarea');
    textArea.value = codeElement.innerText;
  
    // Add the textarea to the DOM and select its contents
    document.body.appendChild(textArea);
    textArea.select();
  
    // Copy the code to the clipboard
    document.execCommand('copy');
  
    // Remove the textarea from the DOM
    document.body.removeChild(textArea);
  
    // Show the pop-up message
    const popup = document.querySelector('.popup');
    popup.style.display = 'block';
    setTimeout(() => {
      popup.style.display = 'none';
    }, 2000);
  }