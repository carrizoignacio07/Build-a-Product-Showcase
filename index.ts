interface Item {
  type: "book" | "electronics" | "clothing",
  id: string,
  price: number
}

interface Book extends Item {
  type: "book",
  title: string,
  author: string
}

interface Electronics extends Item {
  type: "electronics",
  item: string,
  model: string,
  warranty?: number
}

interface Clothing extends Item {
  type: "clothing",
  item: string,
  brand: string,
  size?: "S" | "M" | "L"
}

type Product = Book | Electronics | Clothing;

class Collection<T> {
  constructor(public items: T[]) { }
  getAll(): T[] {
    return this.items;
  }
  filter(cb: (item: T) => boolean): T[] {
    return this.items.filter(cb);
  }
}

function renderProduct(p: Product): string {
  let details = "";

  switch (p.type) {
    case "book":
      // Información del libro
      details = `Book: ${p.title} by ${p.author}`;
      break;

    case "electronics":
      // Información del dispositivo
      details = `Electronics: ${p.item} - ${p.model}${p.warranty ? ` - Warranty: ${p.warranty} year(s)` : ""}`;
      break;

    case "clothing":
      // Información de la prenda
      details = `Clothing: ${p.item} by ${p.brand}${p.size ? ` - Size ${p.size}` : ""}`;
      break;

    default:
      throw new Error(`Unknown product type: ${JSON.stringify(p)}`);
  }

  return `
    <div id="${p.id}" class="item">
      <p class="price">${p.price}</p>
      <p>${details}</p>
    </div>
  `;
}

const products = new Collection<Product>([
  {
    type: "book",
    id: "1",
    price: 20,
    title: "Clean Code",
    author: "Robert C. Martin"
  },
  {
    type: "electronics",
    id: "2",
    price: 150,
    item: "Laptop",
    model: "ThinkPad",
    warranty: 2
  },
  {
    type: "clothing",
    id: "3",
    price: 30,
    item: "T-Shirt",
    brand: "Nike",
    size: "M"
  }
]);

const output = document.getElementById("output");

function showProducts(filter?: Product["type"]): void {
  if (output === null) return;

  let result: Product[];

  if (filter) {
    result = products.filter(product => product.type === filter);
  } else {
    result = products.getAll();
  }

  output.innerHTML = result.map(renderProduct).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  showProducts();
});

document.getElementById("all")?.addEventListener("click", () => {
  showProducts();
});

document.getElementById("books")?.addEventListener("click", () => {
  showProducts("book");
});

document.getElementById("electronics")?.addEventListener("click", () => {
  showProducts("electronics");
});

document.getElementById("clothing")?.addEventListener("click", () => {
  showProducts("clothing");
});
