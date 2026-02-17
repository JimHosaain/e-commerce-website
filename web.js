let allProducts = [];

const loadItems = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data));
};

const loadProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) => {
      allProducts = products;
      displayProducts(products);
    });
};

const displayCategory = (categories) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  createCategoryBtn("All");

  for (let category of categories) {
    createCategoryBtn(category);
  }

  function createCategoryBtn(name) {
    const btn = document.createElement("button");
    btn.className = "btn btn-neutral btn-outline rounded-full";
    btn.innerText = name;

    btn.onclick = () => {
      if (name === "All") {
        displayProducts(allProducts);
      } else {
        const filtered = allProducts.filter((p) => p.category === name);
        displayProducts(filtered);
      }
    };

    levelContainer.appendChild(btn);
  }
};

const displayProducts = (products) => {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  container.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6";

  products.forEach((p) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="card bg-base-100 shadow-md hover:shadow-xl transition duration-300 rounded-xl">

        <figure class="bg-gray-100 p-4 h-52 sm:h-60">

          <img src="${p.image}" class="h-full object-contain" />
        </figure>

        <div class="card-body">

          <div class="badge badge-primary badge-outline capitalize">
            ${p.category}
          </div>

          <h2 class="card-title text-sm leading-tight">
            ${p.title.slice(0, 50)}...
          </h2>

          <div class="flex items-center gap-2 text-sm">
            ⭐ ${p.rating.rate}
            <span class="text-gray-500">
              (${p.rating.count})
            </span>
          </div>

          <div class="text-xl font-bold">
            $${p.price}
          </div>

          <div class="card-actions justify-between mt-3">

            <button class="btn btn-outline btn-sm">
              Details
            </button>

            <button class="btn btn-primary btn-sm">
              Add
            </button>

          </div>

        </div>
      </div>
    `;

    container.appendChild(div);
  });
};

loadItems();
loadProducts();

const loadTrending = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      const trending = shuffled.slice(0, 3);
      displayTrending(trending);
    });
};

const displayTrending = (products) => {
  const container = document.getElementById("trending-container");
  if (!container) return;

  container.innerHTML = "";

  products.forEach((p) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="card bg-base-100 shadow-md hover:shadow-xl transition duration-300 rounded-xl">


        <figure class="bg-gray-100 p-4 h-52 sm:h-60">
          <img src="${p.image}" class="h-full object-contain" />
        </figure>

        <div class="card-body">
          <div class="badge badge-primary badge-outline">
            ${p.category}
          </div>

          <h2 class="card-title text-sm">
            ${p.title.slice(0, 45)}...
          </h2>

          <p class="font-bold">$${p.price}</p>
        </div>
      </div>
    `;

    container.appendChild(div);
  });
};

loadTrending();
