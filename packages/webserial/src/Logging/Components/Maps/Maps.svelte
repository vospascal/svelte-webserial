<script>
    import {getContext} from 'svelte';

    let pedalMap = getContext("WSC-pedalMap");
    let pedalMapSerial = getContext("WSC-pedalMapSerial");

    let calibrationMap = getContext("WSC-calibrationMap");
    let calibrationMapSerial = getContext("WSC-calibrationMapSerial");

    let invertedMap = getContext("WSC-invertedMap");
    let invertedMapSerial = getContext("WSC-invertedMapSerial");

    let smoothMap = getContext("WSC-smoothMap");
    let smoothMapSerial = getContext("WSC-smoothMapSerial");

    let bitsMap = getContext("WSC-bitsMap");
    let bitsMapSerial = getContext("WSC-bitsMapSerial");

    pedalMap.subscribe(newValue => {
        console.log(newValue)
    })

</script>
<div>
    <pre>{JSON.stringify($pedalMap)}</pre>
    <pre>{JSON.stringify($pedalMapSerial)}</pre>

    <pre>{JSON.stringify($calibrationMap)}</pre>
    <pre>{JSON.stringify($calibrationMapSerial)}</pre>

    <pre>{JSON.stringify($invertedMap)}</pre>
    <pre>{JSON.stringify($invertedMapSerial)}</pre>

    <pre>{JSON.stringify($smoothMap)}</pre>
    <pre>{JSON.stringify($smoothMapSerial)}</pre>

    <pre>{JSON.stringify($bitsMap)}</pre>
    <pre>{JSON.stringify($bitsMapSerial)}</pre>
</div>
