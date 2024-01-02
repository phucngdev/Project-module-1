let $ = document.querySelector.bind(document);
let $S = document.querySelectorAll.bind(document);

let ordersLocalStorage = JSON.parse(localStorage.getItem("orders")) || [];
console.log(ordersLocalStorage);

function renderOrder() {
  const listOrder = ordersLocalStorage.map((order, index) => {
    return `
    <tr key="${order.id}">
      <td>${index + 1}</td>
      <td>
        <div class="listProductsOrder">
          ${order.products.map((product) => {
            return `
            <div class="productOrder" key="${product.id}">
              <div class="image">
                <img
                  src="${product.image}"
                  alt=""
                />
              </div>
              <div class="infoProduct">
                <span>${product.name}</span>
                <span>${product.priceat}</span>
              </div>
            </div>
            `;
          })}
        </div>
      </td>
      <td>
        <div class="address">
          <span>${order.city}</span>
          <span>${order.district}</span>
          <span>${order.ward}</span>
          <span>${order.address}</span>
          <span>${order.phone}</span>
        </div>
      </td>
      <td>
        <div class="orderTime">
          <span>${order.totalBill}</span>
        </div>
      </td>
      <td>
        <button class="btn btn-success">Chấp nhận</button>
      </td>
      <td>
        <button class="btn btn-danger">Từ chối</button>
      </td>
    </tr>
    `;
  });
  const itemOrder = listOrder.join(" ");
  $("#tbody").innerHTML = itemOrder;
}
renderOrder();
