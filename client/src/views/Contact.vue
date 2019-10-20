<template>
<div class="parent">
    <div class="box-one">
      <h1>
        Hi,<br />
        I’m 
        <span class="color-secondary">Eric Sudhartio
        </span>
        <br />
        I'm a <span class="color-secondary">Web Developer</span>, at 
        <a class="color-secondary" href="#">Hacktiv8</a> 
      </h1>
      <div style="margin-top:50px;" class=''>
      <a class="contact-link glow-on-hover" target="_blank" href="https://www.instagram.com/ericsudhartio/"> Contact Me</a> </div>
    </div>
    <div class="box-two">
      <div class="image " >
      <img class='img22' src="https://storage.cloud.google.com/ecommerce_project/IMG_2741.jpeg" >
      </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>

.glow-on-hover {
    width: 220px;
    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
}

.glow-on-hover:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left:-2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 10px;
}

.glow-on-hover:active {
    color: #000
}

.glow-on-hover:active:after {
    background: transparent;
}

.glow-on-hover:hover:before {
    opacity: 1;
}

.glow-on-hover:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
    border-radius: 10px;
}

@keyframes glowing {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
}
.parent {
  background-color: #252E3B;
  height: 400px;
  display: flex;
}
h1 {
  font-size: 30px;
  margin: 0px;
  font-family: monospace;
}
.box-one {
  width: 40%;
  color: white;
  background-color: black;
  padding: 50px;
}
.box-two {
  width: 80%;
  background: linear-gradient(-35deg, #F0DA50 63%, black 42%);
  color: white;
}
.img22 {
  max-width: 100%;
  height: auto;
  margin: -50px;
  border-radius: 50%;
  border: 3px solid #F0DA50;
}
.image {
    height: 250px;
    width: 250px;
    border-radius: 50%;
    margin-top: 8%;
    margin-left: 27%;
}
.color-secondary, a {
  color: #F0DA50;
  text-decoration: none;
}
.contact-link {
  padding: 10px 30px;
  background: black;
  border-radius: 5px;
  font-family: monospace;
  font-weight: 700;
  font-size: 18px;
  color: gold;
}
</style>
