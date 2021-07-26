<script>
    import Pedalmap_clutch from "./Components/Pedalmap/Pedalmap_clutch.svelte";
    import Pedalmap_brake from "./Components/Pedalmap/Pedalmap_brake.svelte";
    import Pedalmap_throttle from "./Components/Pedalmap/Pedalmap_throttle.svelte";
    import Timeline from "./Components/Timeline/Timeline.svelte";
</script>

<div style="display: flex; flex-wrap:  wrap; justify-content: center; align-items: stretch;">
    <Pedalmap_clutch/>
    <Pedalmap_brake/>
    <Pedalmap_throttle/>
</div>
<div style="display: flex; flex-wrap:  wrap; justify-content: center; align-items: stretch;">
    <Timeline/>
</div>