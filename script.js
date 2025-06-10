document.addEventListener("DOMContentLoaded", () => {
    getDate();
})

let date = "";

async function getDate() {
    const time = document.getElementById("date");
    try {
        const response = await fetch("https://api.myquran.com/v2/tools/time");
        if (!response.ok) {
            throw new Error(`Error!: ${response.status}`);
        }
        const tanggal = await response.json();
        time.innerHTML = tanggal.data.date.full[1];
        date = tanggal.data.date.full[1];
    } catch (error) {
        console.log(error);
    }
}

async function randomAyah() {
const number = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const randomNumber = number(1, 6236);
const ayahText = document.getElementById("ayah");
const surahTitle = document.getElementById("surah-title");
const surahNumber = document.getElementById("surah-number");
console.log(randomNumber);

   const url = `https://api.alquran.cloud/v1/ayah/${randomNumber}/en.asad`;
   const dataAyah = await fetch(url);
   const verses = await dataAyah.json();
   ayahText.innerText = '" ' + verses.data.text + ' "';
   surahTitle.innerText = verses.data.surah.englishName;
  surahNumber.innerText = verses.data.surah.number + ":" + verses.data.numberInSurah;
   console.log(verses);
}

async function getTime() {
    let cityName = document.getElementById("search-bar").value;
    const checker = ["Kabupaten", "kabupaten", "kab"];
    if (checker.some(word => cityName.includes(word))) {
        let words = cityName.split(" ");
        if (checker.includes(words[0])) {
            words[0] = "Kab.";
            cityName = words.join(" ");
        }
    }
    const location = document.getElementById("location");
    const subuh = document.getElementById("subuh-time");
    const dzuhur = document.getElementById("dzuhur-time");
    const ashar = document.getElementById("ashar-time");
    const maghrib = document.getElementById("magrib-time");
    const isha = document.getElementById("isha-time");
    const url = `https://api.myquran.com/v2/sholat/kota/cari/${cityName}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error!: ${response.status}`);
        } else {
            const data = await response.json();
            console.log(data);
            if (!cityName) {
              alert("Silakan masukkan nama kota / kabupaten terlebih dahulu");
            } else if (data.status === false) {
                alert(`Kota dan kabupaten dengan nama ${cityName} tidak ditemukan, Silahkan masukkan nama yang valid`);
                return;
            } else if (data.data.length > 1) {
                for (let i = 0; i < data.data.length; i++) {
                  alert(`Apakah yang kamu maksud adalah ${data.data[i].lokasi}?`)
                }
                alert("Silahkan masukkan kembali")
                return;
            }
            location.innerText = data.data[0].lokasi;
            const cityId = data.data[0].id;
            console.log(data);
            const dateUrl = `https://api.myquran.com/v2/sholat/jadwal/${cityId}/${date}`;
            const prayerTime = await fetch(dateUrl);

            if (!prayerTime.ok) {
                throw new Error(`Error!: ${prayerTime.status}`);
            }
            const idData = await prayerTime.json();
            subuh.innerText = idData.data.jadwal.subuh;
            dzuhur.innerText = idData.data.jadwal.dzuhur;
            ashar.innerText = idData.data.jadwal.ashar;
            maghrib.innerText = idData.data.jadwal.maghrib;
            isha.innerText = idData.data.jadwal.isya;
            console.log(idData);
            randomAyah();
        }
    } catch (error) {
        console.log(error);
    }
}
