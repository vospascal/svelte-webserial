<script>
    import {getContext} from 'svelte';

    let connected = getContext('WSC-connected');
    let {connect, disconnect} = getContext('WSC-actions');

    const handleConnect = () =>  {
        console.log('handleConnect');
        connect();
    }
    const handleDisconnect= () =>  {
        console.log('handleConnect');
        disconnect();
    }

</script>

<button disabled={$connected} on:click={handleConnect}>connect</button>
<button disabled={!$connected} on:click={handleDisconnect}>disconnect</button>