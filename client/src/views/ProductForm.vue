<template>
  <div id="form">
    
    <h1>Product form!</h1>
  
    <a-form
      id="components-form-demo-validate-other"
      :form="form"
      @submit="handleSubmit"
      enctype="multipart/form-data"
    >
      <a-form-item label="product name" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
        <a-input
          v-decorator="['name', { rules: [{ required: true, message: 'Please input your product name!' }] }]"
        />
      </a-form-item>

      <a-form-item label="product description" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
        <a-textarea
          v-decorator="['description', { rules: [{ required: true, message: 'Please input your product description!' }] }]"
        />
      </a-form-item>

      <a-form-item :label-col="{ span : 6}" :wrapper-col="{ span : 1}" label="quantity">
        <a-input-number
          :min="1"
          :max="10000000000000000000"
          v-decorator="['qty', { rules: [{ required: true, message: 'Empty' }] }]"
        />
      </a-form-item>

      <a-form-item :label-col="{ span : 6}" :wrapper-col="{ span : 1}" label="price">
        <a-input-number
          :min="1000"
          :max="10000000000000000000"
          :step="1000"
          v-decorator="['price', { rules: [{ required: true, message: 'required' }] }]"
          :style="{ width: '220px' }"
        />
      </a-form-item>

      <a-form-item :label-col="{ span : 6}" :wrapper-col="{ span : 14}" label="categories">
        <a-checkbox-group
          v-decorator="['categories', { initialValue: [] , rules: [{ required: true, message: 'category/categories required!' }]}]"
          style="width: 100%;"
        >
          <a-row>
            <a-col :span="2">
              <a-checkbox value="Goks">Goks</a-checkbox>
            </a-col>
            <a-col :span="2">
              <a-checkbox value="Woyo">Woyo</a-checkbox>
            </a-col>
            <a-col :span="2">
              <a-checkbox value="Sanss">Sanss</a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>

      <a-form-item label="upload image" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
        <a-upload-dragger
          name="file"
          :multiple="false"
          @change="handleChange"
          :beforeUpload="beforeUpload"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">Click or drag file to this area to upload</p>
          <p class="ant-upload-hint">
            Support for a single upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </a-upload-dragger>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
        <a-button type="primary" html-type="submit" :loading="loading">Add Product</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "ProductForm",
  data() {
    return {
      file: null,
      loading: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "validate_other" });
    
    this.form.setFieldsValue({
      ["name"]: "hello"
    });
  },
  methods: {
    handleChange(info) {
      const status = info.file.status;
      this.file = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },

    beforeUpload(file) {
      this.file = file;
      return false;
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let bodyFromData = new FormData();
          bodyFromData.append("name", values.name);
          bodyFromData.append("description", values.description);
          bodyFromData.append("categories", values.categories);
          bodyFromData.append("price", values.price);
          bodyFromData.append("qty", values.qty);
          bodyFromData.append("image", this.file);
          let body = {
            ...values,
            image: this.file
          };
          this.loading = true;
          this.$store
            .dispatch("addProduct", bodyFromData)
            .then(data => {
              this.$notification.open({
                message: "Success",
                description:
                  "yeay! add product success. thank you for helping your boss getting rich",
                icon: <a-icon type="smile" style="color: #108ee9" />
              });
              this.$router.push('/admin')
              this.form.resetFields();
              this.loading = false;
            })
            .catch(err => {
              this.$router.push("/");
              this.$notification.open({
                message: "Process Fail",
                description: err.response.data.message,
                icon: <a-icon type="meh" style="color: #108ee9" />
              });
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lobster|Varela+Round&display=swap");
h1 {
  font-family: "Lobster", cursive;
  margin: 2vh;
  font-size: 48px;
}
#form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;

  /* align-items: center; */
}
</style>