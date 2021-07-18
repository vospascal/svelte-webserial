<script>
    import {getContext} from 'svelte';

    let pedalMap = getContext("WSC-pedalMap");
    let calibrationMap = getContext("WSC-calibrationMap");
    let invertedMap = getContext("WSC-invertedMap");
    let smoothMap = getContext("WSC-smoothMap");
    let bitsMap = getContext("WSC-bitsMap");

</script>
<div>
    <pre>{JSON.stringify($pedalMap)}</pre>
    <pre>{JSON.stringify($calibrationMap)}</pre>
    <pre>{JSON.stringify($invertedMap)}</pre>
    <pre>{JSON.stringify($smoothMap)}</pre>
    <pre>{JSON.stringify($bitsMap)}</pre>
</div>