<script>
    import WebSerialContext from "./Services/WebSerialContext.svelte";
    import Buttons from "./Buttons/Buttons.svelte";
    import {Tab, TabList, TabPanel, Tabs} from "./Tabs/tabs";

    import Overlay from "./Overlay/Overlay.svelte";
    import Pedals from "./Pedals/Pedals.svelte";
    import Calibration from "./Calibration/Calibration.svelte";
    import Logging from "./Logging/Logging.svelte";
    import About from "./About/About.svelte";

</script>

<div style="width: 900px; margin: 0 auto;">
    <WebSerialContext>
        <Buttons/>
        <div style="position: relative; padding:10px;">
            <Overlay>
                <p style="text-align: center; font-size: 18px;">
                    Your arduino is not <u>connected</u>! <br>
                    Please <u>connect</u> to your arduino,  <br><br>

                    When you make changes or calibrate the pedals, <br>
                    dont forget to <u>save</u> it to the arduino <br><br>

                    When <u>connected</u> this message will disappear. <br> <br>

                    Drive safe and have fun! <br><br>

                    The arduino code is found <a href="https://github.com/vospascal/pedal-arduino/">here</a>
                </p>
            </Overlay>
            <Tabs>
                <TabList>
                    <Tab>Pedals</Tab>
                    <Tab>Calibration</Tab>
                    <Tab>Logging</Tab>
                    <Tab>About</Tab>
                </TabList>

                <TabPanel>
                    <Pedals />
                </TabPanel>

                <TabPanel>
                    <Calibration />
                </TabPanel>

                <TabPanel>
                    <Logging />
                </TabPanel>

                <TabPanel>
                    <About/>
                </TabPanel>
            </Tabs>
        </div>

    </WebSerialContext>
</div>
