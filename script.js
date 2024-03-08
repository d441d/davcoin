let cash = 20;
let val = 2;
let own = 0;
let max = 3;
let min = 1;
let chance = 0.50;
let currentMod = null;
let isLoaded = false;

async function update() {
  const nVal = Math.floor(Math.random() * (max - min + 1)) + min;
  const c = Math.random();
  if (c < chance) {
    val = val + nVal;
  } else {
    if (val - nVal >= 1) {
      val = val - (nVal + 1);
    } else {
      val = 1;
    }
  }
  document.getElementById('val').textContent = "Value: " + String(val);
  document.getElementById('cash').textContent = "Cash: " + String(cash);
  document.getElementById('own').textContent = "Owned: " + String(own);
  save()
}

setInterval(update, 500);

async function buy(v) {
  if ((v * val) < (cash + 1)) {
    cash = cash - (v * val)
    own = own + v
  }
}

async function sell(v) {
  if (v < (own + 1)) {
    own = own - v
    cash = (v * val)
  }
}

async function load(mod) {
  if (mod == null) {
    console.log('NO MOD LOADED')
  } else {
    const script = document.createElement('script');
    script.src = `mods/${mod}.js`;
    script.onload = () => {
      console.log(`${mod} loaded successfully!`);
      currentMod = mod;
      save(); // Save currentMod after setting it
    };
    script.onerror = (error) => {
      console.error(`Error ${mod}:`, error);
    };
    document.head.appendChild(script);
  }
  isLoaded = true
}

async function mod(mod) {
  let data = localStorage.getItem('data');
  if (mod == 'clear') {
    if (data) {
      try {
        data = JSON.parse(data);
      } catch (error) {
        console.error("Error:", error);
        data = {};
      }
      delete data.mod;
      localStorage.setItem('data', JSON.stringify(data));
      alert('Mod cleared, refresh page to see changes');
    } else {
      alert('No data found');
    }
  } else {
    if (data) {
      try {
        data = JSON.parse(data);
      } catch (error) {
        console.error("Error:", error);
        data = {};
      }
    } else {
      data = {};
    }
    data.mod = mod;
    currentMod = mod;
    localStorage.setItem('data', JSON.stringify(data));
    alert('Mod loaded, refresh page to see changes');
  }
}

async function save() {
  datastr = localStorage.getItem('data')
  if (datastr) {
    try {
      let data = {
          val: val,
          cash: cash,
          own: own,
      };

      if (isLoaded == true) {
        data.mod = currentMod;
      }

      localStorage.setItem('data', JSON.stringify(data));
    } catch (error) {
        console.error("Error:", error);
    }
  }
}


window.onload = function() {
    let dataString = localStorage.getItem('data');
    if (dataString) {
        try {
            data = JSON.parse(dataString);
            if (data.val && data.cash && data.own) {
              val = data.val;
              cash = data.cash;
              own = data.own;
              currentMod = data.mod;
              load(currentMod);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    } else {
        console.log("No data.");
    }
}



