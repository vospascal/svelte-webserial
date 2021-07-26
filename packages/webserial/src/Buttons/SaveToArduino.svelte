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
        connect();
    }
    const handleDisconnect = () => {
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
        write(calibrationMap) //tcali + bcali + ccali
        write(invertedMap);
        write(smoothMap);
        write(bitsMap);
    }
</script>

<button disabled={!$connected} on:click={saveToArduino}>save to arduino</button>
