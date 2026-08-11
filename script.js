const galleryItems =
    document.querySelectorAll(".gallery-item");

const lightbox =
    document.getElementById("lightbox");

const lightboxImg =
    document.getElementById("lightboxImg");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxCategory =
    document.getElementById("lightboxCategory");

const closeBtn =
    document.getElementById("closeBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const searchInput =
    document.getElementById("searchInput");

const filterButtons =
    document.querySelectorAll(".filter-btn");


let currentIndex = 0;


/* ================= BUKA FOTO ================= */

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        currentIndex = index;

        showImage(currentIndex);

        lightbox.classList.add("show");

    });

});


/* ================= TAMPILKAN FOTO ================= */

function showImage(index) {

    const item = galleryItems[index];

    const image =
        item.querySelector("img");

    const title =
        item.dataset.title;

    const category =
        item.dataset.category;

    lightboxImg.src = image.src;

    lightboxImg.alt = image.alt;

    lightboxTitle.textContent = title;

    lightboxCategory.textContent =
        category.toUpperCase();

}


/* ================= NEXT ================= */

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
    }

    showImage(currentIndex);

});


/* ================= PREVIOUS ================= */

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
    }

    showImage(currentIndex);

});


/* ================= CLOSE ================= */

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        closeLightbox();

    }

});


function closeLightbox() {

    lightbox.classList.remove("show");

}


/* ================= KEYBOARD ================= */

document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (e.key === "Escape") {

        closeLightbox();

    }

    if (e.key === "ArrowRight") {

        nextBtn.click();

    }

    if (e.key === "ArrowLeft") {

        prevBtn.click();

    }

});


/* ================= FILTER ================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
            button.dataset.filter;

        galleryItems.forEach(item => {

            const category =
                item.dataset.category;

            if (
                filter === "all" ||
                category === filter
            ) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});


/* ================= SEARCH ================= */

searchInput.addEventListener("input", () => {

    const search =
        searchInput.value.toLowerCase();

    galleryItems.forEach(item => {

        const title =
            item.dataset.title.toLowerCase();

        if (title.includes(search)) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });

});