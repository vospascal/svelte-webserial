<script>
    import {getContext} from 'svelte';

    let connected = getContext('WSC-connected');
    let {connect, disconnect, write} = getContext('WSC-actions');

    let pedalMapSerial = getContext("WSC-pedalMapSerial");
    let pedalMap = "";

    let calibrationMapSerial = getContext("WSC-calibrationMapSerial");
    let calibrationMap = ""

    let invertedMapSerial = getContext("WSC-invertedMapSerial");
    let invertedMap = ""

    let smoothMapSerial = getContext("WSC-smoothMapSerial");
    let smoothMap = ""

    let bitsMapSerial = getContext("WSC-bitsMapSerial");
    let bitsMap = ""

    const handleConnect = () => {
        console.log('handleConnect');
        connect();
    }
    const handleDisconnect = () => {
        console.log('handleConnect');
        disconnect();
    }

    pedalMapSerial.subscribe((value) => {
        pedalMap = value;
    });
    calibrationMapSerial.subscribe((value) => {
        calibrationMap = value;
    });
    invertedMapSerial.subscribe((value) => {
        invertedMap = value;
    });
    smoothMapSerial.subscribe((value) => {
        smoothMap = value;
    });
    bitsMapSerial.subscribe((value) => {
        bitsMap = value;
    });

    const saveToArduino = () => {
        write(pedalMap.split(",")[0]); //tmap
        write(pedalMap.split(",")[1]); //bmap
        write(pedalMap.split(",")[2]); //cmap
        write(calibrationMap.split(",")[0]); //tcali
        write(calibrationMap.split(",")[1]); //bcali
        write(calibrationMap.split(",")[2]); //ccali
        write(invertedMap);
        write(smoothMap);
        write(bitsMap);
    }
</script>

<button disabled={$connected} on:click={handleConnect}>connect</button>
<button disabled={!$connected} on:click={handleDisconnect}>disconnect</button>
<button on:click={saveToArduino}>save to arduino</button>