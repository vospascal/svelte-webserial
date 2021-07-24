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
    import {Tab, TabList, TabPanel, Tabs} from "./Tabs/tabs";

    import D3BulletGraph_clutch_hid from "./D3BulletGraph/D3BulletGraph_clutch_hid.svelte";
    import D3BulletGraph_clutch_raw from "./D3BulletGraph/D3BulletGraph_clutch_raw.svelte";
    import D3BulletGraph_brake_hid from "./D3BulletGraph/D3BulletGraph_brake_hid.svelte";
    import D3BulletGraph_brake_raw from "./D3BulletGraph/D3BulletGraph_brake_raw.svelte";
    import D3BulletGraph_throttle_hid from "./D3BulletGraph/D3BulletGraph_throttle_hid.svelte";
    import D3BulletGraph_throttle_raw from "./D3BulletGraph/D3BulletGraph_throttle_raw.svelte";
</script>

<div style="width: 860px; margin: 0 auto;">
    <WebSerialContext >
        <div style="padding: 0 10px;">
            <Buttons/>
        </div>
        <Tabs>
            <TabList>
                <Tab>Pedals</Tab>
                <Tab>Calibration</Tab>
                <Tab>Logging</Tab>
                <Tab>About</Tab>
            </TabList>

            <TabPanel>
                <h1>Pedals</h1>
                <!--        <D3PedalMap_clutch />-->
<!--                <D3PedalMap_clutch />-->

                <div style="display: flex; flex-wrap:  wrap; justify-content: center; align-items: stretch;">
                    <Pedalmap_throttle/>
                    <Pedalmap_brake/>
                    <Pedalmap_clutch/>
                </div>
                <div style="display: flex; flex-wrap:  wrap; justify-content: center; align-items: stretch;">
                    <Timeline/>
                </div>
            </TabPanel>

            <TabPanel>
                <h1>Calibration</h1>
                <D3BulletGraph_clutch_hid />
                <D3BulletGraph_clutch_raw />
                <hr>
                <D3BulletGraph_brake_hid />
                <D3BulletGraph_brake_raw />
                <hr>
                <D3BulletGraph_throttle_hid />
                <D3BulletGraph_throttle_raw />
            </TabPanel>

            <TabPanel>
                <h1>Logging</h1>
                <Logger/>
                <Maps/>
            </TabPanel>

            <TabPanel>
               <p>
                   Thank you for using this open source solution for diy pedals. <br>
                   This is not to be sold its open and free for everyone to use. <br>
                <p/>
                <p>
                   You can find executable and arduino code in the following locations <br>
                   Gui executable : <a href="https://github.com/vospascal/pedal-gui">pedal-gui</a>  <br>
                   Arduino code that works with the gui exe file: <a href="https://github.com/vospascal/pedal-arduino/">pedal-arduino</a>  <br>
                <p/>
                <p>
                   If you like it please consider a donation to further development. <br>
                   <a href="paypal.com/donate/?business=TBPE6XCB2XBMW&item_name=pedalbox&currency_code=EUR">donate on paypal</a>
               </p>
            </TabPanel>
        </Tabs>


    </WebSerialContext>
</div>
