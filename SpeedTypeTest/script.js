const typingText=document.querySelector('.typing-text p');
const input=document.querySelector('.wrapper .input-field');
const time =document.querySelector('.time span b');
const mistakes=document.querySelector('.mistake span');
const wpm=document.querySelector('.wpm span');
const cpm=document.querySelector('.cpm span');
const Btn=document.querySelector('button');
//set value

let timer;
let maxTime=60;
let timeLeft= maxTime;
let charIndex=0;
let mistake=0;
let isTyping=false;
function loadParagraph()
{
    const paragraph=["The sun slowly rose over the quiet hills, spreading golden light across the fields. Birds began to sing, and a gentle breeze carried the scent of fresh morning dew.",
  "Technology has changed the way we work and communicate. Every day brings new innovations that make life faster, smarter, and more connected.",
  "Success is not about how fast you reach your goals, but how steadily you move toward them. Consistency and patience build lasting results.",
  "In the middle of chaos, find your calm. Breathe, focus, and take one small step at a time to move forward with confidence."];
  const randomIndex =Math.floor(Math.random()*paragraph.length);
  typingText.innerHTML='';
  for(const char of paragraph[randomIndex]){
  console.log(char);
  typingText.innerHTML+= `<span>${char}</span>`;
  }
 typingText.querySelectorAll('span')[0].classList.add('active');
 document.addEventListener('keydown',()=>input.focus());
 typingText.addEventListener("click",()=>input.focus())
}
//handle user input 
function initTyping(){
    const char=typingText.querySelectorAll('span');
    const typedChar=input.value.charAt(charIndex);
    if(charIndex<char.length && timeLeft>0)
    {
        if(!isTyping)
        {
            timer=setInterval(initTime,1000);
            isTyping=true;
        }


        if(char[charIndex].innerText ===typedChar)
        {
            char[charIndex].classList.add('correct');
            console.log("correct");
        }
        else
        {
            mistake++;
            char[charIndex].classList.add('incorrect');
             console.log("incorrect");
        }
        charIndex++;

        char[charIndex].classList.add('active');
        mistakes.innerText=mistake;
        cpm.innerText = charIndex-mistake;
    }
    else{
         clearInterval (timer);
         input.value='';
    }


}
function initTime()
{
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        let wpmVal = Math.round(((charIndex-mistake)/5)/(maxTime-timeLeft)*60);
        wpm.innerText =wpmVal;
    }
    else{
         clearInterval(timer);
    }
}
function reset()
{
    loadParagraph();
    clearInterval(timer);
    timeLeft=maxTime;
    charIndex=0;
    mistake=0;
    isTyping=false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
    time.innerText=timeLeft;
    input.value='';

}

input.addEventListener("input",initTyping);
Btn.addEventListener("click",reset);
loadParagraph();