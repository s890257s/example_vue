<template>
  <main class="h-100" style="background-color: #eee">
    <div class="container h-100 py-5">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-10">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>
            <div>
              排序：<select>
                <option>價格低至高</option>
                <option>價格高至低</option>
              </select>
            </div>
          </div>

          <div class="card rounded-3 mb-4" v-for="item of cartItems">
            <div class="card-body p-4">
              <div
                class="row d-flex justify-content-between align-items-center"
              >
                <div class="col-md-2 col-lg-2 col-xl-2">
                  <img
                    :src="`${API_URL}/product/photo/${item.productPhotoId}`"
                    class="img-fluid rounded-3"
                  />
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                  <p class="lead fw-normal mb-2 fs-5">
                    {{ item.productName }}
                  </p>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                  <button
                    class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                  >
                    <i class="fas fa-minus"></i>
                  </button>

                  <input
                    id="form1"
                    min="0"
                    name="quantity"
                    :value="item.quantity"
                    type="number"
                    class="form-control form-control-sm"
                  />

                  <button
                    class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                  <h5 class="mb-0">${{ item.productPrice }}</h5>
                </div>
                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                  <a href="#!" class="text-danger"
                    ><i class="fas fa-trash fa-lg"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-body text-center">
              <button type="button" class="btn btn-warning btn-block btn-lg">
                結帳
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      cartItems: [],
    };
  },
  mounted() {
    axios
      .get(`${this.API_URL}/cart`)
      .then((rs) => {
        this.cartItems = rs.data;
      })
      .catch(() => {
        alert("未登入!");
      });
  },
};
</script>
<style></style>
