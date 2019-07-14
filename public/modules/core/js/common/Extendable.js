Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content');

Vue.config.async = false;


var Extendable = Vue.extend({

    methods: {

        //---------------------------------------------------------------------
        processApiRequest: function (url, params, callback, nprogress=true) {

            if(nprogress)
            {
                NProgress.start();
            }
            this.$http.post(url, params)
                .then(response => {
                    if(response.data.status == 'success')
                    {
                        if(response.data.messages)
                        {
                            this.messages(response.data.messages);
                        }


                        if(response.data.warnings)
                        {
                            this.warnings(response.data.warnings);
                        }

                        callback(response.data.data)
                    } else
                    {
                        console.log(response);
                        this.errors(response.data.errors);
                        if(nprogress)
                        {
                            NProgress.done();
                        }
                    }
                });
        },
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        warnings: function (warnings) {
            $.each(warnings, function (index, object) {
                alertify.error(object);
            });
        },
        //---------------------------------------------------------------------
        errors: function (errors) {
            $.each(errors, function (index, object) {
                alertify.error(object);
            });
        },
        //---------------------------------------------------------------------
        messages: function (messages) {
            $.each(messages, function (index, object) {
                alertify.success(object);
            });
        },
        //---------------------------------------------------------------------
        success: function (message) {
            if(message === undefined)
            {
                message = "success"
            }
            alertify.success(message);
        },
         //---------------------------------------------------------------------
         paginate: function (event, page) {
            event.preventDefault();
            this.current_page = page;
            this.listLoader();
        },
        //---------------------------------------------------------------------
        makePagination: function (data) {
            this.pagination = Pagination.Init(data.last_page, this.current_page, 3);
        },
        //---------------------------------------------------------------------
        paginateIsActive: function (page) {
            if(page == this.current_page)
            {
                return true;
            }
            return false;
        },
        //---------------------------------------------------------------------
        stopProgressBar : function(){
            this.$nextTick(function(){
                NProgress.done();
            })
        },
    }
});
