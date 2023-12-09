function typeWriter(element, text, speed) {
  let index = 0;
  element.innerHTML = ''; // Be sure the element is empty before start writting. 
  function writeText() {
    if (index < text.length) {
      let char = text.charAt(index);
      if (char === '<') {
        // Obsługa znaczników HTML
        let tag = '';
        do {
          tag += char;
          char = text.charAt(++index);
        } while (char !== '>');
        tag += char;
        element.innerHTML += tag;
      } else {
        element.innerHTML += char;
      }
      index++;
      setTimeout(writeText, speed);
    }
  }
  writeText();
}

document.addEventListener('DOMContentLoaded', () => {
  const myElement = document.querySelector('.typewriter');
  const textToType = "Cześć, jesteśmy firmą Klementowski. <br>Tworzymy przyszłość zarządzania systemami informacji w organizacjach prywatnych.";
  typeWriter(myElement, textToType, 50); // Adjust speed as necessary
});


function handleHamburgerClick() {
 var navLinks = document.querySelector('.nav-links');
    if (navLinks.classList.contains('show-menu')) {
        navLinks.classList.add('hide-menu');
        setTimeout(function() {
            /* navLinks.style.display = 'none'; */
        }, 1000); // animation time 
        navLinks.classList.remove('show-menu');
    } else {
        /* navLinks.style.display = 'grid'; */
        navLinks.classList.add('show-menu');
        navLinks.classList.remove('hide-menu');
    }
}

function mobileToggleMenu() {
	console.log('Mobile Menu hiden');
}

// Function add "visible" class to the element, when is in viewport area */
function revealOnScroll() {
  const elementsToReveal = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px',
    threshold: 0.1 // 10% elementu musi być widoczne
  });

  elementsToReveal.forEach(element => {
    observer.observe(element);
  });
}

document.addEventListener('DOMContentLoaded', revealOnScroll);
  


/*
 *
//funkcja przesuwa ekran do klasy
function scrollToClass(className) {
	console.log("scrollToClass servis for: ", className);
    const element = document.querySelector('.' + className);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

*/






const sectionClasses = [
  'header-index',
  'main-presentation',
  'hero-skills',
  'curriculum-vitae',
  'footer-index'
];




function smoothScrollTo(element) {
    const startPosition = window.pageYOffset;
    const endPosition = element.getBoundingClientRect().top;
    const startTime = performance.now();

    function scrollStep(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / 500, 1); 

        window.scrollTo(0, startPosition + (endPosition * progress));

        if (progress < 1) {
            window.requestAnimationFrame(scrollStep);
        }
    }

    window.requestAnimationFrame(scrollStep);
}

function scrollToClass(className) {
	console.log('Scrolling to:', className);
	const element = document.querySelector('.' + className);
	const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	if (element) {
		console.log("Element==true");
		if (isFirefox) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		} else {
			smoothScrollTo(element);
		}
	}
	else{
		console.log("element!=true; element==false");
	}
}


/*
//funkcja, która sprawdza, czyjesteśmy bliżej klasy .A, czy klasy .B.
function scrollToClass(className) {
	// Logika przewijania do danej klasy
	console.log('Scrolling to:', className);
	// Przykładowo, użyjemy 'scrollIntoView' dla elementu
	const element = document.querySelector('.' + className);
	if (element) {
		console.log("Element==true");
		
		/* element.scrollIntoView({ behavior: 'smooth', block: 'start'}); 
		 element.scrollIntoView({ block: 'start'}); 
	}
	else{
		console.log("element!=true; element==false");
	}
}
*/
/*
// Function to scrooll to particular class
function scrollToClass(className) {
	console.log("scrollToClass service for 2: ", className);
  const element = document.querySelector('.' + className);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
*/
// Function for finding particular section
function getCurrentSectionIndex() {
  const scrollPosition = window.pageYOffset;
  const sections = sectionClasses.map(className => document.querySelector('.' + className));

  let closestSectionIndex = 0;
  let smallestDistance = Infinity;

  for (let i = 0; i < sections.length; i++) {
    const rect = sections[i].getBoundingClientRect();
    const sectionTop = rect.top + scrollPosition;
    const distance = Math.abs(scrollPosition - sectionTop);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestSectionIndex = i;
    }
  }

  return closestSectionIndex;
}

// Function for mouse scrolling event 
const onWheelEvent = (event) => {
	// giving actual section index
	let currentSectionIndex = getCurrentSectionIndex();

	// `deltaY` wskazuje kierunek przewijania:
	// dodatni wartości `deltaY` oznaczają przewijanie w dół
	if (event.deltaY > 0) {
		console.log('Przewijanie w dół');
	// Przesuń do klasy pod aktualnym indeksem, o ile nie jest to ostatnia sekcja
	if (currentSectionIndex < sectionClasses.length - 1) {
		scrollToClass(sectionClasses[currentSectionIndex + 1]);
	}
	} else {
		console.log('Przewijanie w górę');
		// Przesuń do klasy nad aktualnym indeksem, o ile nie jest to pierwsza sekcja
	if (currentSectionIndex > 0) {
		scrollToClass(sectionClasses[currentSectionIndex - 1]);
	}
  }
};

// Dodanie nasłuchiwania na zdarzenie przewijania kółkiem

document.addEventListener('wheel', onWheelEvent); 

/* document.addEventListener('wheel', onWheelEvent, { passive: false }); */












// Funkcja, która sprawdza, który element jest bliżej środka ekranu.
function findCloserElement() {
  const windowHeight = window.innerHeight;
  const centerOfWindow = windowHeight / 2;

  // Pobranie elementów
  const elementA = document.querySelector('.header-index');
  const elementB = document.querySelector('.main-presentation');
  const elementC = document.querySelector('.hero-skills');
  const elementD = document.querySelector('.curriculum-vitae');
  const elementE = document.querySelector('.footer-index');

  // Obliczenie odległości od środka ekranu do środka każdego elementu
  const calculateDistance = (element) => {
    const rect = element.getBoundingClientRect();
    const centerOfElement = rect.top + (rect.height / 2);
    return Math.abs(centerOfWindow - centerOfElement);
  };

  // Obliczenie odległości dla każdego elementu
  const distances = [
    { element: 'header-index', distance: calculateDistance(elementA) },
    { element: 'main-presentation', distance: calculateDistance(elementB) },
    { element: 'hero-skills', distance: calculateDistance(elementC) },
    { element: 'curriculum-vitae', distance: calculateDistance(elementD) },
    { element: 'footer-index', distance: calculateDistance(elementE) }
  ];

  // Posortuj elementy według odległości od centrum
  distances.sort((a, b) => a.distance - b.distance);

  // Zwróć klasę elementu najbliższego środkowi ekranu
  const closest = distances[0].element;

  console.log(`${closest} jest najbliżej środka wysokości ekranu`);
  scrollToClass(closest);
}

  

// Zmienna stanu, czy przeciąganie jest aktywne
let isDragging = false;

// Zdarzenie mousedown aktywowane, gdy przycisk myszy zostanie naciśnięty
window.addEventListener('mousedown', function(event) {
  // Sprawdź, czy kliknięto lewy przycisk myszy
  if (event.button === 0) {
    isDragging = true;
  }
});

// Zdarzenie mousemove aktywowane, gdy mysz się przesuwa
window.addEventListener('mousemove', function(event) {
  // Tylko jeśli przeciąganie jest aktywne
  if (isDragging) {
    // Możemy zarejestrować przesunięcie, ale nie logujemy w konsoli na tym etapie
  }
});

// Zdarzenie mouseup aktywowane, gdy przycisk myszy zostanie zwolniony
window.addEventListener('mouseup', function(event) {
  // Sprawdź, czy przeciąganie było aktywne
  if (isDragging) {
    //console.log('Suwak został puszczony po przesunięciu');
    isDragging = false; // Zresetuj stan przeciągania

    findCloserElement();

  }
});




// touch screen function

let touchStartY = 0;
let touchEndY = 0;
let touchStartTime = 0;

const someThreshold = 0.2 // value that has to be defined. Define strong of hold/move of touch.


window.addEventListener('touchstart', function(event) {
  touchStartY = event.touches[0].clientY;
  touchStartTime = new Date().getTime(); // Save time of touch start.
}, false);



window.addEventListener('touchmove', function(event) {
  // Optionally: actualize end posision durring the movment. 
  touchEndY = event.changedTouches[0].clientY;
}, false);

window.addEventListener('touchend', function(event) {
  touchEndY = event.changedTouches[0].clientY;
  handleTouchEnd();
}, false);

function handleTouchEnd() {
  const touchDuration = new Date().getTime() - touchStartTime; // Durration of screen touching
  const touchDistance = Math.abs(touchEndY - touchStartY); // Odległość przesunięcia

  const swipeStrength = touchDistance / touchDuration; // Strange of movment

  console.log('Siła przesunięcia:', swipeStrength);

  if (swipeStrength > someThreshold) {
    findCloserElement();   }
  else findCloserElement();
}


