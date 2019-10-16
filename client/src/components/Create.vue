<template>
<div class="container">  
  <form id="contact" @submit.prevent='createProduct()'>
    <h3>Create New Product</h3>
    <h4>Contact us today, and get reply with in 24 hours!</h4>
    <fieldset>
      <input 
        v-model='form.name'
        placeholder="Name Product" 
        type="text" 
        tabindex="1" 
        required 
        autofocus
        >
    </fieldset>
    <fieldset>
        <table>
            <tr>
                <td>
                    Brand
                </td>
                <td>
                    <select v-model='form.brand'>
                        <option>Audi</option>
                        <option>BMW</option>
                        <option>Ferrari</option>
                        <option>Lamborghini</option>
                        <option>Mercedes-Benz</option>
                        <option>Porsche</option>
                        <option>Honda</option>
                        <option>Toyota</option>
                    </select>
                </td>
            </tr>
        </table>
    </fieldset>
    <fieldset>
        <table>
            <tr>
                <td>
                    Price
                </td>
                <td>
                    <input 
                        v-model='form.price'
                        type='number' 
                        placeholder="Price" 
                        tabindex="2" 
                        required
                        >
                </td>
            </tr>
        </table>
    </fieldset>
    <fieldset>
        <table>
            <tr>
                <td>
                    Stock
                </td>
                <td>
                    <input 
                        v-model='form.stock'
                        placeholder="Stock" 
                        type="number" 
                        tabindex="3"
                        >
                </td>
            </tr>
        </table>
    </fieldset>
    <fieldset>
      <input
        @click='takeFile()'
        type="file" 
        tabindex="4" 
        required
        >
    </fieldset>
    <fieldset>
      <textarea 
        v-model='form.description'
        placeholder="Description" 
        tabindex="5" 
        required
        ></textarea>
    </fieldset>
    <fieldset>
      <button 
        name="submit" 
        type="submit" 
        id="contact-submit" 
        data-submit="...Sending"
        >Save

      </button>
    </fieldset>
  </form>
 
  
</div>

</template>

<script>
export default {
    data(){
        return {
            form:{
                name: '',
                brand: '',
                price: 0,
                description: '',
                stock: 0,
                file: ''
            },
            isloading: false
        }
    },
    methods: {
        createProduct(){
            const formData = new FormData();
            formData.append("image", this.file)
            axios({
                method: "post",
                url: 'http://localhost:3000/products',
                data: {
                    name: this.form.name,
                    description: this.form.description,
                    price: this.form.price,
                    stock: this.form.stock,
                    brand: this.form.brand,
                    image: formData
                }
            })
                .then(_=>{
                    this.isloading= true
                    console.log('success');
                })
                .catch(err=>{
                    this.isloading= true
                    console.log(err.response.data.msg);
                })
            console.log(this.form.file)
        },
        takeFile(){
            this.form.file = this.$refs.file.files[0]
        }
    }
}
</script>

<style>@import url(https://fonts.googleapis.com/css?family=Open+Sans:400italic,400,300,600);

* {
	margin:0;
	padding:0;
	box-sizing:border-box;
	-webkit-box-sizing:border-box;
	-moz-box-sizing:border-box;
	-webkit-font-smoothing:antialiased;
	-moz-font-smoothing:antialiased;
	-o-font-smoothing:antialiased;
	text-rendering:optimizeLegibility;
}

.container {
	max-width:400px;
	width:100%;
	margin:0 auto;
	position:relative;
}

#contact input[type="text"], #contact input[type="email"], #contact input[type="tel"], #contact input[type="url"], #contact textarea, #contact button[type="submit"] { font:400 12px/16px "Open Sans", Helvetica, Arial, sans-serif; }

#contact {
	background:#F9F9F9;
	padding:25px;
	margin:50px 0;
}

#contact h3 {
	color: #F96;
	display: block;
	font-size: 30px;
	font-weight: 400;
}

#contact h4 {
	margin:5px 0 15px;
	display:block;
	font-size:13px;
}

fieldset {
	border: medium none !important;
	margin: 0 0 10px;
	min-width: 100%;
	padding: 0;
	width: 100%;
}

#contact input[type="text"], #contact input[type="email"], #contact input[type="tel"], #contact input[type="url"], #contact textarea {
	width:100%;
	border:1px solid #CCC;
	background:#FFF;
	margin:0 0 5px;
	padding:10px;
}

#contact input[type="text"]:hover, #contact input[type="email"]:hover, #contact input[type="tel"]:hover, #contact input[type="url"]:hover, #contact textarea:hover {
	-webkit-transition:border-color 0.3s ease-in-out;
	-moz-transition:border-color 0.3s ease-in-out;
	transition:border-color 0.3s ease-in-out;
	border:1px solid #AAA;
}

#contact textarea {
	height:100px;
	max-width:100%;
  resize:none;
}

#contact button[type="submit"] {
	cursor:pointer;
	width:100%;
	border:none;
	background:#0CF;
	color:#FFF;
	margin:0 0 5px;
	padding:10px;
	font-size:15px;
}

#contact button[type="submit"]:hover {
	background:#09C;
	-webkit-transition:background 0.3s ease-in-out;
	-moz-transition:background 0.3s ease-in-out;
	transition:background-color 0.3s ease-in-out;
}

#contact button[type="submit"]:active { box-shadow:inset 0 1px 3px rgba(0, 0, 0, 0.5); }

#contact input:focus, #contact textarea:focus {
	outline:0;
	border:1px solid #999;
}
::-webkit-input-placeholder {
 color:#888;
}
:-moz-placeholder {
 color:#888;
}
::-moz-placeholder {
 color:#888;
}
:-ms-input-placeholder {
 color:#888;
}

</style>