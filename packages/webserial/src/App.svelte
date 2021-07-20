<script>
    import Test from "./Test.svelte";
    import WebSerialContext from "./Services/WebSerialContext.svelte";
    import Logger from "./Logger/Logger.svelte";
    import Buttons from "./Buttons/Buttons.svelte";
    import Maps from "./Maps/Maps.svelte";
    import Timeline from "./Timeline/Timeline.svelte";
    import Pedalmap from "./Pedalmap/Pedalmap.svelte";
</script>

<div style="width: 860px; margin: 0 auto;">
    <WebSerialContext >
        <div style="padding: 0 10px;">
            <Buttons/>
            <Logger/>
            <Maps/>
        </div>
        <div style="display: flex; flex-wrap:  wrap; justify-content: center; align-items: stretch;">
            <Pedalmap type="clutch"/>
            <Pedalmap type="throttle"/>
            <Pedalmap type="brake"/>
        </div>
        <div style="display: flex; flex-wrap:  wrap; justify-content: center; align-items: stretch;">
            <Timeline/>
        </div>
    </WebSerialContext>
</div>
