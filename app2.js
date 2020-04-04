
const vm = new Vue({
    el:"#app",
    data:{
        modal:false,
        listaInstrumentos:{},
        carrinhoModal:false,
        detalheLista:{},
        incluirItem: false,
        incluiProduto:{
            id:"",
            nome:"",
            preco:undefined,
            quantidade:undefined,
            description:"",
            marca:"",
            img:"",
        },
        nome:"Valmyr",
        mesAlerta:false,
        carrinho:[],
        msgAlerta:"Foi adicionado um item ao carrinho"
    },
    methods:{
        fetchInstrumentos(){
            fetch("./api/listaInstrumentos.json")
            .then((response)=> response.json())
            .then((r)=> this.listaInstrumentos = r)
            this.listaInstrumentos
        },
        mostraDetalhe(id){
            this.modal = true
          this.detalheLista = this.listaInstrumentos[id]
          
            
        },
        subirScroll(id){
            this.mostraDetalhe(id);
            window.scrollTo({
                top: 0,
                behavior:"smooth"

            })
        },
        adicionarProduto(){
            this.detalheLista.quantidade --;
            const{nome, preco }=this.detalheLista
            this.carrinho.push({
                nome:nome,
                preco:preco
            })
           this.alerta(nome +" Foi adicionado com sucesso")
        },

        removerItem(index, nome){
           console.log(index,nome)
            this.carrinho.splice(index,1)
            this.listaInstrumentos.forEach((item)=>{
                if(item.nome===nome) item.quantidade++
            })
         },
       
         removeModal(){
            this.modal = false;
            detalheLista = {}
         },
         checandoStorage(){
             if(window.localStorage.carrinho){
                 this.carrinho = JSON.parse(window.localStorage.carrinho)
             }
            },
        alerta(mensagem){
            this.msgAlerta = mensagem;
            this.mesAlerta = true;
            setTimeout(()=>{
                this.mesAlerta = false
            },1500)
        },
        foi(){
            
             this.listaInstrumentos.push(JSON.stringify(this.incluiProduto))
            
            console.log(this.listaInstrumentos)
            this.fetchInstrumentos();
        },
        abrirCarrinho(){
            if(this.carrinho.length===0){
                this.alerta("Insira algum produto no carrinho")
            }else

           { this.carrinhoModal=true
           }
           
        }
        },
    watch:{
        carrinho(){
            window.localStorage.carrinho = JSON.stringify(this.carrinho) 
            if(this.carrinho.length == 0) this.carrinhoModal = false
        },
    },
    filters: {
        maiuscula(v) {
            return v.toUpperCase();
            },
        valor (items) {
            return "R$ " + items + ",00 /"
        },
        quantidade(item){
            return item + " itens /"
        },
        },
    computed:{
        carrinhoTotal(){
            let total = 0
            this.carrinho.forEach((item)=>{
                total += item.preco
            })
            return total
        }
        },
    created(){
        this.fetchInstrumentos();
        this.checandoStorage();
        console.log(this.listaInstrumentos)

    }

    })
        
           
            
          
           

       

       
      



    
          
                     
           


       
       
    
  
