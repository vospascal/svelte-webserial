<script>
    import {getContext, onDestroy} from 'svelte';

    let message = getContext('WSC-message');
    let connected = getContext('WSC-connected');

    $: list = [];

    const handleMessages = async () => {
        if (list.length >= 10) {
            list = [$message, ...list].slice(0, -1)
        } else {
            list = [$message, ...list]
        }
    }

    $: {
        $message, handleMessages()
    }


</script>
<div>
    <pre>{JSON.stringify(list, null, 2)}</pre>
    <hr>
    <pre>{JSON.stringify($message, null, 2)}</pre>
</div>