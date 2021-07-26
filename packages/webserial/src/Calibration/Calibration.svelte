<script>
    import D3BulletGraph_clutch_hid from "./Components/D3BulletGraph/D3BulletGraph_clutch_hid.svelte";
    import D3BulletGraph_clutch_raw from "./Components/D3BulletGraph/D3BulletGraph_clutch_raw.svelte";
    import D3BulletGraph_brake_hid from "./Components/D3BulletGraph/D3BulletGraph_brake_hid.svelte";
    import D3BulletGraph_brake_raw from "./Components/D3BulletGraph/D3BulletGraph_brake_raw.svelte";
    import D3BulletGraph_throttle_hid from "./Components/D3BulletGraph/D3BulletGraph_throttle_hid.svelte";
    import D3BulletGraph_throttle_raw from "./Components/D3BulletGraph/D3BulletGraph_throttle_raw.svelte";
</script>

<D3BulletGraph_clutch_hid/>
<D3BulletGraph_clutch_raw/>
<hr>
<D3BulletGraph_brake_hid/>
<D3BulletGraph_brake_raw/>
<hr>
<D3BulletGraph_throttle_hid/>
<D3BulletGraph_throttle_raw/>