$(function(){
    var $containerQuestionAnswer = $('#questions-container');

    $('#js-question-reponses-button').click(function() {
        $("ul.tabs li#questions-reponses").trigger('click');
        $('html,body').animate({scrollTop: $("#avis").offset().top},'slow');
    });

    $('#js-avisVerifiesQuestionClone').on('click', function(){
       $('#js-avisVerifiesQuestion').click();
    });

    $containerQuestionAnswer.on('click', 'input[name="avisVerifiesAnswerQuestion"]', function(){
        $(this).closest('div').find('div.modalAvisVerifiesAnswerQuestion').slideToggle();
    });

    $containerQuestionAnswer.on('click', 'button.js-report-abuse', function(){
        $(this).closest('div').find('div.js-modal-avis-verifies-report-abuse').slideToggle();
    });

    $containerQuestionAnswer.on('click', 'button.js-upvote', function(){
        var answerUuid = $(this).attr('data-answer-uuid');
        var $upVoteCount = $(this).closest('div.alertVote').find('i.js-upvote-count');

        var params = {
            'answerId' : answerUuid
        };

        $.ajax({
            type: "POST",
            url: '/product/avis-verifies/answer/upvote',
            data: params,
            success: function (data) {
                if ('success' !== data) {
                    return false;
                }
                $upVoteCount.html(parseInt($upVoteCount.html()) + 1);
            },
            error:  function(e) {
                console.log(e);
            }
        });
    });

    $containerQuestionAnswer.on('click', 'button.js-display-more-questions', function(){
        var $spanDisplayMore = $(this);
        var paramsMoreQuestion = {
            'offset' : $(this).attr('data-question-offset'),
            'productId' : $(this).attr('data-question-product-id')
        };

        $.ajax({
            type: "GET",
            url: '/product/avis-verifies/get-question-answer',
            data: paramsMoreQuestion,
            success: function (data) {
                $spanDisplayMore.remove();
                $('div#questions-container').append(data);
            },
            error:  function(e) {
                console.log(e);
            }
        });
    });

    $containerQuestionAnswer.on('click', 'button.js-display-more-answers', function(){
        var $spanDisplayMore = $(this);
        var questionUuid = $spanDisplayMore.attr('data-answer-question-uuid');
        var paramsMoreAnswers = {
            'offset' : $(this).attr('data-answer-offset'),
            'productId' : $(this).attr('data-answer-product-id'),
            'questionUuid' : questionUuid
        };

        $.ajax({
            type: "GET",
            url: '/product/avis-verifies/get-more-answers',
            data: paramsMoreAnswers,
            success: function (data) {
                $spanDisplayMore.remove();
                var newDivAnswer = $('<div></div>');
                newDivAnswer.html(data);
                var $newAnswers = newDivAnswer.find('div.answer-container');
                var $displayMore = newDivAnswer.find('button.display-more-answers');
                $('div#answers-container-'+questionUuid).append($newAnswers).after($displayMore);
            },
            error:  function(e) {
                console.log(e);
            }
        });
    });
});
