<template>
  <div class="hello">
    <vue-accordion :items="items"  :styles="style"></vue-accordion>
    <p>Click picture to see items <b>or</b></p>
    <b-button type="is-primary" class="btm" size="is-medium">Click Here</b-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      items: [
        {
          title: 'Best Seller',
          text: 'to see our best seller item click this picture',
          url: '/shop/bestseller',
          image:
            'https://images.unsplash.com/photo-1514505832027-1534ca2f576c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
          title: 'Art For Professional',
          text: 'to see profesional materials for art click this picture',
          url: '/shop/profesional',
          image:
            'https://images.unsplash.com/photo-1420802532821-8a885e88e95c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
          title: 'Art For Kids',
          text: 'to see kids section click this picture',
          url: '/shop/kids',
          image:
            'https://whatsnewindonesia.com/jakarta/wp-content/uploads/sites/2/2018/04/art_classes_jakarta-1.jpg'
        },
        {
          title: 'Paint',
          text: 'to see all paint we sell click this picture',
          url: '/shop/paint',
          image:
            'https://images.unsplash.com/photo-1452802447250-470a88ac82bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
          title: 'Paint Brush',
          text: 'to see all paint brush we sell click this picture',
          url: '/shop/brush',
          image:
            'https://images.unsplash.com/photo-1520420097861-e4959843b682?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
          title: 'All Items',
          text: 'to see all item click this picture',
          url: '/shop/',
          image:
            'https://images.unsplash.com/photo-1516422821770-ee3c71d84383?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        }
      ],
      style: {
        div: {
          height: '290px'
        },
        ul: {
          color: '#F00'
        },
        li: {
          fontSize: '15px'
        },
        a: {
          padding: '30px'
        },
        h2: {
          marginTop: '10px'
        },
        p: {
          textTransform: 'uppercase'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
