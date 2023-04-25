
function copyCode() {

    const codeElement = document.querySelector('.code');

    const textArea = document.createElement('textarea');
    textArea.value = codeElement.innerText;

    document.body.appendChild(textArea);
    textArea.select();

    document.execCommand('copy');

    document.body.removeChild(textArea);

    // const popup = document.querySelector('.popup');
    // popup.style.display = 'block';
    // setTimeout(() => {
    //   popup.style.display = 'none';
    // }, 2000);
  }