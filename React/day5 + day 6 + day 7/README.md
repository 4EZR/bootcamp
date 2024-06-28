# Day 5 -  React Lifecycle 

Implementasi React Lifecycle pada component time.tsx yang terletak pada assets/components yang di tampilkan di pages time di route /time 

Lifecycle yang di gunakan
componentDidMount dipanggil setelah komponen di-render. Ini memulai interval yang memperbarui waktu setiap detik.
componentWillUnmount dipanggil sebelum komponen dihapus. Ini membersihkan interval .

# Day 6 -  Api search 

implementasi api search unsplash  axios call disimpan pada services/unsplashService untuk komponen di bagi menjadi 2 searchbar (searchbar untuk mencari foto ) dan photogrid (menampilkan foto) yang di panggil di pages/search (function handle search) 

# Day 7 - Use Ref 

implementasi Ref Pada inputsearch mengubah dari function componennt (with hook) kembali ke class component , dan menghandle tampilan photo grid dengan tampilan serupa dengan unsplash yaitu Masonry Grid dengan bantuan library react-masonry-css pada komponen PhotoGrid.jsx