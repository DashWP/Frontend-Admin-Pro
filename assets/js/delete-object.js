(function($) {
    $(document).ready(function() {
        $( 'body' ).on(
            'click',
            '.fea-delete-button',
            function(e){
                var button = $( this );
    
                if ( button.hasClass( 'disabled' ) ) {
                    return;
                }
    
                button.addClass( 'disabled' )
    
                var tooltip = acf.newTooltip(
                    {
                        confirm: true,
                        text: button.data( 'confirm' ),
                        target: button,
                        context: button.parents( 'acf-field' ),
                        confirm: function () {
                            deleteObject( button );
                        },
                        cancel: function () {
                            button.removeClass( 'disabled' );
                        }
                    }
                );
    
            }
        );
    
        function deleteObject(button) {
            $( window ).off( 'beforeunload' );
            button.after( '<span class="fea-loader"></span>' )
            $form = button.closest( 'form' );
            $form.find( 'button.fea-submit-button' ).addClass( 'disabled' );
    
            var formData = new FormData( $form[0] );
    
            var fieldWrap = button.closest( '.acf-field' );
    
            if( $form.data('field') ){
                var fieldKey = $form.data('field');
            }else{
                var fieldKey = fieldWrap.data('key');
            }
    
            if( ! fieldKey ){
                console.log('Field key not found');
                return;
            }
    
            formData.append( 'action','frontend_admin/delete_object' );
            formData.append( 'field',fieldKey );
            formData.append( 'delete_object',button.data( 'object' ) );
            $.ajax(
                {
                    url: acf.get( 'ajaxurl' ),
                    type: 'post',
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function(response){
                        if (response.success) {
                            if ( response.data ) {
                                if ( response.data?.redirect ) {
                                    var url = response.data.redirect.replace(/&amp;/g, "&");
                                    window.location = decodeURIComponent(url);
                                }                                
                            }
                        } else {
                            console.log( response );
                        }
                    }
                }
            );
        }
    });
})(jQuery);