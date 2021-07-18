<script>
    import {getContext} from 'svelte';

    let connected = getContext('WSC-connected');
    let {connect, disconnect, write} = getContext('WSC-actions');

    const handleConnect = () =>  {
        console.log('handleConnect');
        connect();
    }
    const handleDisconnect= () =>  {
        console.log('handleConnect');
        disconnect();
    }
    const handleWrite= () =>  {
        console.log('handleWrite');
        write("GetMap/nGetCali");
    }

</script>

<button disabled={$connected} on:click={handleConnect}>connect</button>
<button disabled={!$connected} on:click={handleDisconnect}>disconnect</button>
<button on:click={handleWrite}>handleWrite</button>