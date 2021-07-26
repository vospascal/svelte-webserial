<script>
    import {getContext} from "svelte";

    import D3BulletGraph_clutch_hid from "./Components/D3BulletGraph/D3BulletGraph_clutch_hid.svelte";
    import D3BulletGraph_clutch_raw from "./Components/D3BulletGraph/D3BulletGraph_clutch_raw.svelte";
    import D3BulletGraph_brake_hid from "./Components/D3BulletGraph/D3BulletGraph_brake_hid.svelte";
    import D3BulletGraph_brake_raw from "./Components/D3BulletGraph/D3BulletGraph_brake_raw.svelte";
    import D3BulletGraph_throttle_hid from "./Components/D3BulletGraph/D3BulletGraph_throttle_hid.svelte";
    import D3BulletGraph_throttle_raw from "./Components/D3BulletGraph/D3BulletGraph_throttle_raw.svelte";
    import Calibration_clutch from "./Components/Calibration/Calibration_clutch.svelte";
    import Calibration_brake from "./Components/Calibration/Calibration_brake.svelte";
    import Calibration_throttle from "./Components/Calibration/Calibration_throttle.svelte";
    import SaveToArduino from "../Buttons/SaveToArduino.svelte";

    let {connect, disconnect, write} = getContext('WSC-actions');

    const oldCalibration = () => {
        write("GetCali"); //get calibrarion values
    }
    const resetCalibration = () => {
        write("CALIRESET"); //reset calibrarion values
        write("GetCali"); //get reset calibrarion values
    }

</script>

<Calibration_clutch>
    <D3BulletGraph_clutch_hid/>
    <D3BulletGraph_clutch_raw/>
</Calibration_clutch>
<br>
<Calibration_brake>
    <D3BulletGraph_brake_hid/>
    <D3BulletGraph_brake_raw/>
</Calibration_brake>
<br>
<Calibration_throttle>
    <D3BulletGraph_throttle_hid/>
    <D3BulletGraph_throttle_raw/>
</Calibration_throttle>
<div style="text-align: center; padding: 10px; margin-top: 20px; background: #eeeeee;">
    <button on:click={oldCalibration}>old calibration</button>
    <button on:click={resetCalibration}>reset calibration</button>
    <SaveToArduino/>
</div>