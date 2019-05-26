const app = new Extendable({
    el : '#app',
    //----------------------------------------------
    data : {
        // define variables here
        url : [],
        list : [],

        // for pagination
        pagination : [],
        current_page : 1,
        total_page : null,
        per_page : null,
        //end pagination
    },
    //----------------------------------------------
    mounted : {
        this.url.current = window.location.href;
    },
    //----------------------------------------------
    methods : {
        //define your methods here
        samplePostMethod : function(event){
            if(event){
                event.preventDefault();
            }
            var url = this.url.current+"/urlslug";
            //url = url+"?page="+this.current_page;    //for pagination
            var params = {
                //pass parameters with request
            },
            //url, parameters, callback method
            this.processHttpRequest(url, params, this.samplePostMethodAfter);
        },

        samplePostMethodAfter : function(data){
            this.list = data;

            //if pagiantion

            this.lsit = data.data;
            this.current_page = data.current_page;
            this.total_page = data.total_page;
            this.per_page = data.per_page;

            this.makePagination(data);

            //end paginatoion

            this.stopProgressBar();
        },
    },
    //----------------------------------------------
});