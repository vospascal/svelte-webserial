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
            <Overlay />
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
