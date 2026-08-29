/* =========================================
   EA TECHNIC GARAGE
   ANA SAYFA JAVASCRIPT
========================================= */


/* =========================================
   SUPABASE
========================================= */

const SUPABASE_URL =
  "https://hiizlkcrltedvjkgtfzl.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_h6P4jI0L4bfeQrLsUZHfCw_iDEjTW6A";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


/* =========================================
   SEPET
========================================= */

let cart = [];


function addToCart(productName) {

  cart.push(productName);

  updateCartCount();

  showToast(
    productName +
    " sepete eklendi."
  );

}


function updateCartCount() {

  const cartCount =
    document.getElementById("cartCount");

  if (cartCount) {

    cartCount.textContent =
      cart.length;

  }

}


function showCart() {

  if (cart.length === 0) {

    showToast(
      "Sepetiniz şu anda boş."
    );

    return;

  }


  const products =
    cart
      .map(
        (item, index) =>
          `${index + 1}. ${item}`
      )
      .join("\n");


  alert(
    "SEPETİNİZ\n\n" +
    products +
    "\n\nToplam ürün: " +
    cart.length
  );

}


/* =========================================
   ÜRÜN FİLTRELEME
========================================= */

function filterProducts(category) {

  const products =
    document.querySelectorAll(
      ".product"
    );


  products.forEach(
    function(product) {

      if (category === "all") {

        product.style.display =
          "block";

        return;

      }


      const productCategory =
        product.getAttribute(
          "data-category"
        );


      if (
        productCategory ===
        category
      ) {

        product.style.display =
          "block";

      } else {

        product.style.display =
          "none";

      }

    }
  );


  const productsSection =
    document.getElementById(
      "urunler"
    );


  if (productsSection) {

    productsSection.scrollIntoView({
      behavior: "smooth"
    });

  }

}


/* =========================================
   ARAÇ SEÇİCİ
========================================= */

function findParts() {

  const brand =
    document.getElementById(
      "brand"
    ).value;


  const model =
    document.getElementById(
      "model"
    ).value;


  const year =
    document.getElementById(
      "year"
    ).value;


  const message =
    document.getElementById(
      "vehicleMessage"
    );


  if (
    !brand ||
    !model ||
    !year
  ) {

    message.textContent =
      "Lütfen marka, model ve yıl seçiniz.";

    message.style.color =
      "#dc2626";

    return;

  }


  message.textContent =
    brand +
    " " +
    model +
    " (" +
    year +
    ") için uygun parçalar gösteriliyor.";


  message.style.color =
    "#16803c";


  setTimeout(
    function() {

      const products =
        document.getElementById(
          "urunler"
        );


      if (products) {

        products.scrollIntoView({
          behavior: "smooth"
        });

      }

    },
    500
  );

}


/* =========================================
   BİLDİRİM
========================================= */

function showToast(text) {

  const toast =
    document.getElementById(
      "toast"
    );


  if (!toast) {

    return;

  }


  toast.textContent =
    text;


  toast.classList.add(
    "show"
  );


  setTimeout(
    function() {

      toast.classList.remove(
        "show"
      );

    },
    2500
  );

}


/* =========================================
   GİRİŞ YAPMIŞ KULLANICIYI GÖSTER
========================================= */

async function checkUser() {

  try {

    const {
      data,
      error
    } =
      await supabaseClient.auth.getUser();


    if (error) {

      console.log(
        "Kullanıcı kontrolü:",
        error.message
      );

      return;

    }


    const user =
      data.user;


    const accountButtons =
      document.getElementById(
        "accountButtons"
      );


    if (!accountButtons) {

      return;

    }


    /* =====================================
       KULLANICI GİRİŞ YAPMIŞSA
    ===================================== */

    if (user) {

      let fullName =
        user.user_metadata?.full_name;


      /*
       * Eğer kayıt sırasında
       * full_name kullanılmadıysa
       * ad ve soyadı ayrı ayrı kontrol ediyoruz.
       */

      if (!fullName) {

        const firstName =
          user.user_metadata?.first_name ||
          "";

        const lastName =
          user.user_metadata?.last_name ||
          "";

        fullName =
          (
            firstName +
            " " +
            lastName
          ).trim();

      }


      /*
       * Hâlâ isim yoksa e-posta
       * kullanıcı adı olarak gösterilir.
       */

      if (!fullName) {

        fullName =
          user.email ||
          "Müşteri";

      }


      accountButtons.innerHTML = `

        <div class="user-account">

          <span class="welcome-user">
            👤 Hoş geldin,
            <strong>${escapeHtml(fullName)}</strong>
          </span>

          <button
            type="button"
            class="logout-button"
            onclick="logoutUser()"
          >
            Çıkış Yap
          </button>

        </div>

      `;

    }


    /* =====================================
       KULLANICI GİRİŞ YAPMAMIŞSA
    ===================================== */

    else {

      accountButtons.innerHTML = `

        <a href="giris.html">
          Giriş Yap
        </a>

        <a href="kayit.html">
          Kayıt Ol
        </a>

      `;

    }

  }

  catch (error) {

    console.error(
      "Kullanıcı kontrol hatası:",
      error
    );

  }

}


/* =========================================
   GÜVENLİ HTML
========================================= */

function escapeHtml(text) {

  const div =
    document.createElement(
      "div"
    );


  div.textContent =
    text;


  return div.innerHTML;

}


/* =========================================
   ÇIKIŞ YAP
========================================= */

async function logoutUser() {

  try {

    const {
      error
    } =
      await supabaseClient.auth.signOut();


    if (error) {

      showToast(
        "Çıkış yapılamadı."
      );

      console.error(error);

      return;

    }


    showToast(
      "Başarıyla çıkış yaptınız."
    );


    /*
     * Ana sayfayı yeniliyoruz.
     */

    setTimeout(
      function() {

        window.location.href =
          "index.html";

      },
      700
    );

  }

  catch (error) {

    console.error(error);

    showToast(
      "Çıkış sırasında hata oluştu."
    );

  }

}


/* =========================================
   OTURUM DEĞİŞİKLİĞİNİ DİNLE
========================================= */

supabaseClient.auth.onAuthStateChange(
  function(event, session) {

    console.log(
      "Oturum değişti:",
      event
    );


    /*
     * Giriş veya çıkış olduğunda
     * hesap alanını tekrar kontrol ediyoruz.
     */

    checkUser();

  }
);


/* =========================================
   SAYFA AÇILDIĞINDA
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    updateCartCount();

    checkUser();

  }
);