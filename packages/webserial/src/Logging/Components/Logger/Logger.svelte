<script>
    import {getContext} from 'svelte';

    let message = getContext('WSC-message');
    let list = [];

    message.subscribe({
        next: (msg) => {
            if (list.length >= 1) {
                list = [msg, ...list].slice(0, -1)
            } else {
                list = [msg, ...list]
            }
        },
        complete: () => {
            console.log("[readLoop] DONE");
        },
    });


</script>
<div>
    <pre>{JSON.stringify(list, null, 2)}</pre>
<!--    <hr>-->
<!--    <pre>{JSON.stringify($message, null, 2)}</pre>-->
</div>