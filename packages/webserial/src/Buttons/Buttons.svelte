<script>
    import {getContext} from 'svelte';

    let connected = getContext('WSC-connected');
    let {connect, disconnect, write} = getContext('WSC-actions');

    const handleConnect = () => {
        connect();
    }
    const handleDisconnect = () => {
        disconnect();
    }

</script>

<div style="padding: 10px;">
    <button disabled={$connected} on:click={handleConnect}>connect</button>
    <button disabled={!$connected} on:click={handleDisconnect}>disconnect</button>
</div>