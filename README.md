# Domain Scraping

## Install Dependencies

``` $ npm install ```

### Scrap yclist domains

``` $ node scrap_domains_yclist.js ```

### Scrap Programableweb domains 

#### step 1 :- (crating temp collection for domain list)

``` $ node scrap_domain_programable.js rawScrap ```

#### step 2 :- 

``` $ node scrap_domain_programable.js scrapRawDomains ```

### scrap final valid domains list 

``` $ node main.js ```
