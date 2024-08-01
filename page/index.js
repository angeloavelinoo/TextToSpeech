
async function playAudio() {
    var audio = new Audio('../python/textSpeech.mp3');
    await audio.play();
    await disableButton();
    setTimeout(req, 5000);
  }

async function disableButton(){
  document.getElementById("button-advice").disabled = true;
  setTimeout(()=>{
    document.getElementById("button-advice").disabled = false;
  }, 6000);
}

async function req() {
    fetch('https://api.adviceslip.com/advice')
      .then(response => response.json())
      .then(data => {
        const advice = data.slip.advice;
        
        fetch('http://localhost:5000/save-advice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ advice: advice })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
        })
        .catch(error => {
          console.error('Error sending advice to Python API:', error);
        });
      })
      .catch(error => {
        console.error('Error fetching advice:', error);
      });
      
  };


