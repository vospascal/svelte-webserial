<script>
    import Test from "./Test.svelte";
    import WebSerialContext from "./Services/WebSerialContext.svelte";
    import Logger from "./Logger/Logger.svelte";
    import Buttons from "./Buttons/Buttons.svelte";
    import Maps from "./Maps/Maps.svelte";
    import Timeline from "./Timeline/Timeline.svelte";
    import Pedalmap_brake from "./Pedalmap/Pedalmap_brake.svelte";
    import Pedalmap_clutch from "./Pedalmap/Pedalmap_clutch.svelte";
    import Pedalmap_throttle from "./Pedalmap/Pedalmap_throttle.svelte";
</script>

<div style="width: 860px; margin: 0 auto;">
    <WebSerialContext >
        <div style="padding: 0 10px;">
            <Buttons/>
            <Logger/>
            <Maps/>
        </div>
        <div style="display: flex; flex-wrap:  wrap; justify-content: center; align-items: stretch;">
            <Pedalmap_throttle/>
            <Pedalmap_brake/>
            <Pedalmap_clutch/>
        </div>
        <div style="display: flex; flex-wrap:  wrap; justify-content: center; align-items: stretch;">
            <Timeline/>
        </div>
    </WebSerialContext>
</div>
