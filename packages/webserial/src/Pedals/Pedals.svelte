<script>
    import {getContext} from "svelte";

    import Pedalmap_clutch from "./Components/Pedalmap/Pedalmap_clutch.svelte";
    import Pedalmap_brake from "./Components/Pedalmap/Pedalmap_brake.svelte";
    import Pedalmap_throttle from "./Components/Pedalmap/Pedalmap_throttle.svelte";
    import Timeline from "./Components/Timeline/Timeline.svelte";
    import SaveToArduino from "../Buttons/SaveToArduino.svelte";

    let {connect, disconnect, write} = getContext('WSC-actions');

    const oldMaps = () => {
        write("GetMap"); //get GetMap values
    }
</script>

<div style="display: flex; flex-wrap:  wrap; justify-content: center; align-items: stretch;">
    <Pedalmap_clutch/>
    <Pedalmap_brake/>
    <Pedalmap_throttle/>
</div>
<div style="display: flex; flex-wrap:  wrap; justify-content: center; align-items: stretch;">
    <Timeline/>
</div>
<div style="text-align: center; padding: 10px; margin-top: 20px; background: #eeeeee;">
    <SaveToArduino/>
    <button on:click={oldMaps}>get old maps</button>
</div>