<template>
  <main>
    <div class="container mb-3">
      <div class="row align-items-center text-center">
        <div class="col-1">
          <label for="inputPassword6" class="col-form-label">名稱</label>
        </div>
        <div class="col-4">
          <input type="text" class="form-control" />
        </div>

        <div class="col-1">
          <label for="inputPassword6" class="col-form-label">價格</label>
        </div>
        <div class="col-2">
          <input
            type="number"
            class="form-control"
            placeholder="最小值"
            min="0"
          />
        </div>
        <div class="col-2">
          <input
            type="number"
            class="form-control"
            placeholder="最大值"
            min="0"
          />
        </div>
        <div class="col-2">
          <button class="btn btn-primary">查詢</button>
        </div>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <button class="page-link">
              <span>&laquo;</span>
            </button>
          </li>
          <li
            v-for="i in showPageBar"
            class="page-item"
            :class="{ active: i == currentPage }"
            @click="goToPage(i)"
          >
            <button class="page-link">{{ i }}</button>
          </li>
          <li class="page-item">
            <button class="page-link">
              <span>&raquo;</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="py-1 bg-light">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 text-center">
          <div class="col" v-for="p in showProduct" :key="p.productId">
            <div class="card shadow-sm">
              <img :src="p.photoPath" class="w-100" />
              <p class="card-text mt-2 px-3 text-truncate">
                {{ p.productName }}
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="m-3">價格:{{ p.productPrice }}</div>
                <div class="m-3">
                  <button
                    @click="addToCart(p)"
                    type="button"
                    class="btn btn-sm btn-outline-secondary m-2"
                  >
                    <i class="fa-solid fa-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  mounted() {
    fetch(`${this.API_URL}/products/1`)
      .then((rs) => rs.json())
      .then((pageObj) => {
        this.products = pageObj.content;
        this.totalPage = pageObj.totalPages - 1;
      });
  },
  data() {
    return {
      totalPage: 0,
      currentPage: 1,
      products: [],
    };
  },
  methods: {
    goToPage(i) {
      if (i == "...") return;

      this.currentPage = i;
    },
    addToCart(p) {
      axios
        .get(`${this.API_URL}/product/add/${p.productId}`)
        .then((rs) => {
          Swal.fire({
            title: "done.",
            timer:500
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "請先登入!",
          });
        });
    },
  },
  computed: {
    showProduct() {
      return this.products.map((p) => ({
        ...p,
        photoPath: `${this.API_URL}/product/photo/${p.photoId}`,
      }));
    },
    showPageBar() {
      let pageBar = [];
      const totalPage = this.totalPage; // 總頁數
      const currentPage = this.currentPage; // 當前頁

      // 始終顯示第一頁
      pageBar.push(1);

      // 如果當前頁碼大於4，加入...
      if (currentPage > 4) {
        pageBar.push("...");
      }

      // 根據當前頁計算開始與結束頁
      let startPage = currentPage - 2;
      let endPage = currentPage + 2;
      if (startPage < 2) startPage = 2;
      if (endPage > totalPage - 1) endPage = totalPage - 1;

      // 加入頁碼
      for (let i = startPage; i <= endPage; i++) {
        pageBar.push(i);
      }

      // 如果当前页码小于总页数减3，显示后缀'...'
      if (currentPage < totalPage - 3) {
        pageBar.push("...");
      }

      // 始終顯示最後頁
      if (totalPage > 1) {
        pageBar.push(totalPage);
      }

      return pageBar;
    },
  },
  watch: {
    currentPage(newVal, oldVal) {
      fetch(`${this.API_URL}/products/${newVal}`)
        .then((rs) => rs.json())
        .then((pageObj) => {
          this.products = pageObj.content;
          this.totalPage = pageObj.totalPages - 1;
        });
    },
  },
};
</script>
<style></style>
