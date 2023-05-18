<template>
    <div class="container4 ">

        <CardConect :user="user" @loginsuccess="$emit('login')" />
    </div>
</template>
<script>

import CardConect from './Connectservice/CardConect'
export default {
    components: {
        CardConect
    },
    data() {
        return {
            user: {
                fullName: 'Mike Andrew',
                title: 'Ceo/Co-Founder',
                description: `Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...`,
            }
        }
    }
}
</script>
<style>
div.container4 {
    position: fixed;
    top: 50%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);


}
</style>
