<template>
  <div class="page-container">
    <main class="main-content">
      <div id="invoice-app">
        <div class="header">
          <div>
            <h1>Invoice</h1>
            <p>
              Date:
              {{ date }}
            </p>
          </div>
          <div>
            <div class="section-spacer">
              <input
                type="text"
                placeholder="Company Name"
                class="company-name"
                v-model="company.name"
              />
              <textarea v-on:keyup="adjustTextAreaHeight" readonly="readonly" v-model="company.contact"></textarea>
            </div>
            <div class="section-spacer">
              <p>
                <strong>Bill to:</strong>
              </p>
              <textarea readonly="readonly" v-on:keyup="adjustTextAreaHeight" v-model="client"></textarea>
            </div>
          </div>
        </div>
        <div>
          <label for="currency-picker">Currency:</label>
          <select id="currency-picker" v-model="invoiceCurrency">
            <option
              v-for="(currency, index) in currencies"
              :value="currency"
              :key="index"
            >{{ currency.code }} - {{ currency.name }}</option>
          </select>
        </div>
        <table class="responsive-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Item</th>
        
              <th>Price</th>
              
            
            </tr>
          </thead>
          <tr v-for="(item, index) in items" :key="index">
            <td data-label="No">{{ index + 1 }}</td>
            <td data-label="Item">
              <input type="text" style="width:100% !important" v-model="item.name" readonly="readonly" />
            </td>
        
            <td data-label="Price/unite">
              <div class="cell-with-input">
                
                <input type="text" readonly="readonly"  v-model="item.price" />{{ invoiceCurrency.symbol }}
              </div>
            </td>
          
    
          </tr>
        </table>
       
        <table>
         
          <tr>
            <td>
              <div class="cell-with-input">
                Tax  
                <input class="text-right" type="number" readonly="readonly" min="0" max="100" v-model="taxRate" />%
              </div>
            </td>
         <td>{{ decimalDigits(taxTotal) }}</td>
          </tr>
          <tr class="text-bold">
            <td>Total</td>
            <td>{{ decimalDigits(grandTotal) }}</td>
          </tr>
        </table>
  
        
        <button v-on:click="printInvoice">Print Invoice</button>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
$red: #ff5f6d;
$yellow: #ffc371;
$green: #81cf71;
$white: #faebd7;
$grey:  darken($white, 10%);

body {
    background: linear-gradient(to right, $red, $yellow);
}

.main-content {
    min-height: 100vh;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    @media print {
        align-items: flex-start;
    }
}


#invoice-app {
    background-color: $white;
    padding: 2rem;
    border-radius: 0.5rem;
}

.header {
    @media (min-width: 761px) {
        display: flex;
    }

    > div {
        &:nth-child(-n+1){
            @media (min-width: 761px) {
                order: 1;
                flex: 1;
                text-align: right;
                padding-left: 1rem;
            }
        }
    }
}

.section-spacer {
    margin: 1rem 0;
}

input, select, textarea {
    background-color: transparentize($color: white, $amount: 0.7);
    border: none;
    display: inline-block;
    transition: background-color 0.3s ease-in-out;
    width: 100%;

    &:focus {
        outline-color: $yellow;
        background-color: transparentize($color: white, $amount: 0.4);
    }

    &:hover {
        background-color: transparentize($color: white, $amount: 0.5);
    }

    @media print {
        background-color: transparent;
    }

    @media only screen and (min-width: 761px) {
        width: auto;
    }
}

textarea {
    width: 100%;
    min-height: 80px;
}

select {
    @media 
    only screen and (max-width: 760px) {
        width: 100%;
    }

    @media print {
        appearance: none;
    }
}

.company-name {
    font-size: 2rem;
}

table{
    width: auto; 
    border-collapse: collapse; 
    margin: 2rem 0;
    
    thead{
        th {
            padding: 0.5rem 1rem;

            &:nth-child(-n+1){
                padding-left: 0;
            }
            &:nth-last-child(-n+1){
                padding-right: 0;
            }
        }
    }
    
    tr { 
        border-bottom: 1px solid $grey;

        td {
            padding: 0.5rem 1rem;

            &:nth-child(-n+1){
                padding-left: 0;
            }
            &:nth-last-child(-n+1){
                padding-right: 0;
            }

            input {
                width: 30%;
            }

            .cell-with-input {
                display: flex;

                input {
                    margin: 0 0.2rem;
                }
            }
        }
    }
}

.responsive-table {
    width: 100%;
    @media 
    only screen and (max-width: 760px) {

        table, thead, tbody, th, td, tr { 
            display: block; 
        }

        thead tr { 
            position: absolute;
            top: -9999px;
            left: -9999px;
        }

        tr {
            padding: 2rem 0;
        }

        
        td[data-label] {
            position: relative;
            padding-left: 40%; 
            display: flex;
            align-items: center;

            &:before { 
                content: attr(data-label);
                position: absolute;
                top: 0.5rem;
                left: 0;
                width: 35%; 
                padding-right: 10px; 
                white-space: nowrap;
                font-weight: bold;
            }
        }
    }
}

button {
    background-color: $green;
    border: none;
    border-radius: 100px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:focus {
        outline-color: $yellow;
        background-color: darken($color: $green, $amount: 7%);
    }

    &:hover {
        background-color: darken($color: $green, $amount: 5%);
    }

    @media print {
        display: none;
    }

    &.is-danger{
        background-color: $red;

        &:focus {
            background-color: darken($color: $red, $amount: 7%);
        }
    
        &:hover {
            background-color: darken($color: $red, $amount: 5%);
        }
    }
}

.text-right {
    text-align: right;
}

.text-bold {
    font-weight: bold;
}
</style>

<script>
import store from "@/store/store";
export default {

        data: () => ({
            invoiceCurrency: {
                "symbol": "kn",
                "name": "HRK",
                "symbol_native": "kn",
                "decimal_digits": 2,
                "rounding": 0,
                "code": "HRK",
                "name_plural": "HRK"
            },
            taxRate: 25,
            discountRate: 0,
            items: store.state.cart,
            currencies: [{"symbol":"kn","name":"HRK","symbol_native":"kn","decimal_digits":2,"rounding":0,"code":"HRK","name_plural":"HRK"}],
            company: {
                name: 'Webshop d.d',
                contact: 'St. Address 16 New York \n+3852691285\nadmin@email.com'
            },
            client: 'Louise V Kenyon\n+38592829120\n1536 St. Danez Dove Lane\nNew York',
            invoiceDate: '',
            date: new Date().toISOString().substr(0, 10),
        }),
        methods: {
            addNewItem: function() {
                this.items.push(
                    { description: 'Item name', quantity: 0, price: 0 }
                )
            },
            deleteItem: function(index) {
                this.items.splice(index, 1)
            },
            decimalDigits: function(value) {
                return value.toFixed(this.invoiceCurrency.decimal_digits) + '  ' + this.invoiceCurrency.symbol;
            },
            printInvoice: function() {
                window.print();
            },
            adjustTextAreaHeight: function(event){
                var el = event.target;
                el.style.height = "1px";
                el.style.height = (25+el.scrollHeight)+"px";
            }
        },
        computed: {
            subTotal: function() {
                var total = this.items.reduce(function(accumulator, item) {
                    return accumulator + (item.price);
                }, 0)
                return total;
            },
            discountTotal: function() {
                var total = this.subTotal * (this.discountRate / 100);
                return total;
            },
            taxTotal: function() {
                var total = (this.subTotal - this.discountTotal) * (this.taxRate / 100);
                return total;
            },
            grandTotal: function() {
                var total = (this.subTotal - this.discountTotal) + this.taxTotal;
                return total;
            }
        }
}
</script>