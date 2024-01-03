let $ = document.querySelector.bind(document);
let $S = document.querySelectorAll.bind(document);

let ordersLocalStorage = JSON.parse(localStorage.getItem("orders")) || [];

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
        <button class="btn btn-success btn-accept" id="${
          order.id
        }">Chấp nhận</button>
      </td>
      <td>
        <button class="btn btn-danger btn-refuse" name="${
          order.id
        }">Từ chối</button>
      </td>
    </tr>
    `;
  });
  const itemOrder = listOrder.join(" ");
  $("#tbody").innerHTML = itemOrder;

  $S(".btn-accept").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const orderId = button.id;
      acceptOrder(orderId);
      button.classList.add("bg-black");
      localStorage.setItem(orderId, "bg-black");
    });
  });
  $S(".btn-refuse").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const orderId = button.name;
      refuseOrder(orderId);
      button.classList.add("bg-black");
      localStorage.setItem(orderId, "bg-black");
    });
  });
  // document.addEventListener("DOMContentLoaded", () => {
  //   $S(".btn-accept").forEach((button) => {
  //     const orderId = button.id;
  //     const storedClass = localStorage.getItem(orderId);
  //     if (storedClass === "bg-black") {
  //       button.classList.add("bg-black");
  //     }
  //   });
  //   $S(".btn-refuse").forEach((button) => {
  //     const orderId = button.id;
  //     const storedClass = localStorage.getItem(orderId);
  //     if (storedClass === "bg-black") {
  //       button.classList.add("bg-black");
  //     }
  //   });
  // });
  document.addEventListener("DOMContentLoaded", () => {
    const storedData = localStorage.getItem("buttonStatus");
    if (storedData) {
      const buttonStatus = JSON.parse(storedData);
      $S(".btn-accept, .btn-refuse").forEach((button) => {
        const orderId = button.id;
        const storedClass = buttonStatus[orderId];
        if (storedClass === "bg-black") {
          button.classList.add("bg-black");
        }
      });
    }
    $S(".btn-accept, .btn-refuse").forEach((button) => {
      button.addEventListener("click", () => {
        const orderId = button.id;
        const buttonStatus =
          JSON.parse(localStorage.getItem("buttonStatus")) || {};
        if (button.classList.contains("bg-black")) {
          buttonStatus[orderId] = "bg-black";
        } else {
          delete buttonStatus[orderId];
        }
        localStorage.setItem("buttonStatus", JSON.stringify(buttonStatus));
      });
    });
  });
}
renderOrder();

function acceptOrder(OrderId) {
  const orderItemId = ordersLocalStorage.filter(
    (order) => order.id === OrderId
  );
  const newData = {
    ...orderItemId[0],
    orderStatus: "Đơn hàng được chấp nhận",
  };
  if (orderItemId) {
    const indexOrder = ordersLocalStorage.indexOf(orderItemId[0]);
    ordersLocalStorage[indexOrder] = newData;
    localStorage.setItem("orders", JSON.stringify(ordersLocalStorage));
  }
}

function refuseOrder(OrderId) {
  const orderItemId = ordersLocalStorage.filter(
    (order) => order.id === OrderId
  );
  const newData = {
    ...orderItemId[0],
    orderStatus: "Đơn hàng bị từ chối",
  };
  if (orderItemId) {
    const indexOrder = ordersLocalStorage.indexOf(orderItemId[0]);
    ordersLocalStorage[indexOrder] = newData;
    localStorage.setItem("orders", JSON.stringify(ordersLocalStorage));
  }
}
